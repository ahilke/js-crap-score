import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData, FileCoverageData } from "istanbul-lib-coverage";
import { filter } from "lodash-es";
import { ComplexityService } from "./complexity.service.js";
import { ConfigService } from "./config.service.js";
import { CrapFile, CrapReport } from "./crap-report.js";
import { crap } from "./crap-score.js";
import { FileSystemService } from "./file-system.service.js";
import { getCoverageForFunction } from "./function-coverage.js";
import { HtmlReportService } from "./html-report/html-report.service.js";
import { LintService } from "./lint.service.js";

@Injectable()
export class CrapReportService {
    public constructor(
        private readonly htmlReportService: HtmlReportService,
        private readonly complexityService: ComplexityService,
        private readonly lintService: LintService,
        private readonly fileSystemService: FileSystemService,
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {}

    public async createReport({ testCoverage }: { testCoverage: CoverageMapData }): Promise<CrapReport> {
        const result: CrapReport = {};
        const rootDir = this.getRootDir(Object.keys(testCoverage)) + "/";

        await Promise.all(
            Object.values(testCoverage).map(async (fileCoverage) => {
                const { path: sourcePath } = fileCoverage;
                const relativePath = sourcePath.replace(rootDir, "");

                result[relativePath] = await this.processFile({ fileCoverage });
            }),
        );

        const jsonReportFile = this.configService.getJsonReportFile();
        if (jsonReportFile) {
            await this.fileSystemService.writeJsonReport(jsonReportFile, result);
        }

        if (this.configService.getHtmlReportDir()) {
            await this.htmlReportService.createReport(result);
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

        const uncoveredLinesInFile = this.getUncoveredLines(fileCoverage);

        const lintReport = await this.complexityService.getComplexity({ sourcePath });
        Object.keys(fnMap).forEach((key) => {
            const coverageFunction = fnMap[key];
            const lintFunction = this.lintService.getLintFunctionForCoverageFunction({ coverageFunction, lintReport });
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

            /*
             * Location of the function is taken from ESLint,
             * as it is taken directly from the source code and thus more accurate, especially for TypeScript.
             */
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
                uncoveredLines: uncoveredLinesInFile.filter(
                    (line) => line >= lintFunction.start.line && line <= lintFunction.end.line,
                ),
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

    private getUncoveredLines(fileCoverage: FileCoverageData): number[] {
        const uncoveredStatements = filter(fileCoverage.statementMap, (value, key) => fileCoverage.s[key] === 0);
        const uncoveredLines = uncoveredStatements.reduce((lines, statement) => {
            for (let line = statement.start.line; line <= statement.end.line; line++) {
                lines.add(line);
            }
            return lines;
        }, new Set<number>());
        const uncoveredLinesOrdered = Array.from(uncoveredLines).sort((a, b) => a - b);

        return uncoveredLinesOrdered;
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
