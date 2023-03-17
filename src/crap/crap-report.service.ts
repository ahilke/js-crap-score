import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData, FileCoverageData, FunctionMapping } from "istanbul-lib-coverage";
import { ComplexityService, FunctionComplexity } from "./complexity.service.js";
import { crap } from "./crap-score.js";
import { FileSystemService } from "./file-system.service.js";
import { getCoverageForFunction } from "./function-coverage.js";

export interface CreateReportOptions {
    /**
     * Specifies path where the JSON report will be written to.
     * If undefined, the report is returned without being written to disk.
     */
    writeReportAt?: string;
}

@Injectable()
export class CrapReportService {
    public constructor(
        private readonly complexityService: ComplexityService,
        private readonly fileSystemService: FileSystemService,
        private readonly logger: Logger,
    ) {}

    public async createReport({
        testCoverage,
        options,
    }: {
        testCoverage: CoverageMapData;
        options?: CreateReportOptions;
    }): Promise<CrapReport> {
        const result: CrapReport = {};

        await Promise.all(
            Object.values(testCoverage).map(async (fileCoverage) => {
                const { path: sourcePath } = fileCoverage;

                result[sourcePath] = await this.processFile({ fileCoverage });
            }),
        );

        if (options?.writeReportAt) {
            this.fileSystemService.writeCrapReport(options.writeReportAt, result);
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

            // TODO: add location, so it's more useful with anonymous functions
            // TODO: add human readable descriptor (function at line X, function Y)
            // TODO: what else to add from `lintFunction`?
            result[coverageFunction.name] = {
                complexity,
                functionDescriptor: lintFunction.functionName,
                // TODO: which location to use, istanbul's or ESLint's? -> add log if different
                line: lintFunction.start.line,
                statements: {
                    ...coverageData,
                    coverage,
                    crap: crapScore,
                },
            };

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
}

export interface CrapReport {
    [sourcePath: string]: CrapFile;
}

export interface CrapFile {
    [functionName: string]: CrapFunction;
}

export interface CrapFunction {
    complexity: number;
    functionDescriptor: string | undefined;
    line: number;
    statements: {
        covered: number;
        total: number;
        coverage: number;
        crap: number;
    };
}
