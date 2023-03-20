import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData, FileCoverageData, FunctionMapping } from "istanbul-lib-coverage";
import { ComplexityService, FunctionComplexity } from "./complexity.service.js";
import { ConfigService } from "./config.service.js";
import { CrapFile, CrapReport } from "./crap-report.js";
import { crap } from "./crap-score.js";
import { FileSystemService } from "./file-system.service.js";
import { getCoverageForFunction } from "./function-coverage.js";

@Injectable()
export class CrapReportService {
    public constructor(
        private readonly complexityService: ComplexityService,
        private readonly fileSystemService: FileSystemService,
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {}

    public async createReport({ testCoverage }: { testCoverage: CoverageMapData }): Promise<CrapReport> {
        const { jsonReportFile } = this.configService.config;
        const result: CrapReport = {};
        const rootDir = this.getRootDir(Object.keys(testCoverage)) + "/";

        await Promise.all(
            Object.values(testCoverage).map(async (fileCoverage) => {
                const { path: sourcePath } = fileCoverage;
                const relativePath = sourcePath.replace(rootDir, "");

                result[relativePath] = await this.processFile({ fileCoverage });
            }),
        );

        if (jsonReportFile) {
            await this.fileSystemService.writeJsonReport(jsonReportFile, result);
        }

        return result;
    }

    /**
     * Computes CRAP score for each function in the file as reported by the coverage.
     *
     * # Function Names
     *
     * ESLint generally reports better names/descriptions than istanbul, e.g. for class functions where istanbul
     * just reports "anonymous". Thus, we use it for logging. We still use istanbul's function name for
     * indexing, since it is our primary data source.
     */
    private async processFile({ fileCoverage }: { fileCoverage: FileCoverageData }): Promise<CrapFile> {
        const result: CrapFile = {};

        const { fnMap, path: sourcePath } = fileCoverage;

        const lintReport = await this.complexityService.getComplexity({ sourcePath });
        Object.keys(fnMap).forEach((key) => {
            const coverageFunction = fnMap[key];
            const lintFunction = this.getLintFunctionForCoverageFunction({ coverageFunction, lintReport });
            if (!lintFunction) {
                this.logger.error(`Function '${coverageFunction.name}' not found in ESLint data.`, {
                    file: fileCoverage.path,
                    start: coverageFunction.loc.start,
                    end: coverageFunction.loc.end,
                });
                return;
            }

            const coverageData = getCoverageForFunction({
                functionId: key,
                fileCoverage,
            });
            const { covered: coveredStatements, total: totalStatements } = coverageData;
            const coverage = totalStatements === 0 ? 1 : coveredStatements / totalStatements;

            const complexity = lintFunction.complexity;

            const crapScore = crap({ complexity, coverage });

            result[coverageFunction.name] = {
                complexity,
                functionDescriptor: lintFunction.functionName,
                start: lintFunction.start,
                end: lintFunction.end,
                statements: {
                    ...coverageData,
                    coverage,
                    crap: crapScore,
                },
            };
            if (lintFunction.sourceCode) {
                result[coverageFunction.name].sourceCode = lintFunction.sourceCode;
            }

            this.logger.debug(`Computed CRAP score for '${lintFunction.functionName}'.`, {
                coverage,
                complexity,
                crapScore,
            });
        });

        return result;
    }

    private getLintFunctionForCoverageFunction({
        coverageFunction,
        lintReport,
    }: {
        coverageFunction: FunctionMapping;
        lintReport: Array<FunctionComplexity | null>;
    }): FunctionComplexity | null {
        const coverageFunctionStartLine = coverageFunction.decl.start.line;
        const matchedByStartLine = lintReport.filter((lintFunction) => {
            if (!lintFunction) {
                return false;
            }

            return lintFunction.start.line === coverageFunctionStartLine;
        });

        if (matchedByStartLine.length !== 1) {
            this.logger.error(
                `Could not find matching function in ESLint data for coverage function '${coverageFunction.name}'.`,
                {
                    found: matchedByStartLine,
                    all: lintReport,
                },
            );
            return null;
        }

        return matchedByStartLine[0];
    }

    /**
     * Returns the root directory of the given paths.
     *
     * The root directory is determined as the longest common prefix of all paths.
     */
    private getRootDir(paths: string[]): string {
        const sharedDirectories = paths.reduce((commonPrefixParts, path) => {
            const pathParts = path.split("/");

            const newCommonPrefixParts = [];
            for (let i = 0; i < pathParts.length; i++) {
                if (pathParts[i] !== commonPrefixParts[i]) {
                    break;
                }

                newCommonPrefixParts.push(pathParts[i]);
            }

            return newCommonPrefixParts;
        }, paths[0].split("/"));

        return sharedDirectories.join("/");
    }
}
