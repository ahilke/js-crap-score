import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData, FileCoverageData } from "istanbul-lib-coverage";
import { ComplexityService } from "./complexity.service.js";
import { crap } from "./crap-score.js";
import { FileSystemService } from "./file-system.service.js";
import { getCoverageForFunction } from "./function-coverage.js";

@Injectable()
export class CrapReportService {
    public constructor(
        private readonly logger: Logger,
        private readonly fileSystemService: FileSystemService,
        private readonly complexityService: ComplexityService,
    ) {}

    public async createReport({ testCoverage }: { testCoverage: CoverageMapData }): Promise<CrapReport> {
        const result: CrapReport = {};

        await Promise.all(
            Object.values(testCoverage).map(async (fileCoverage) => {
                const { path: sourcePath } = fileCoverage;

                result[sourcePath] = await this.processFile({ fileCoverage });
            }),
        );

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
        const source = this.fileSystemService.loadSourceFile(sourcePath);

        const lintReport = await this.complexityService.getComplexity({ sourceCode: source });
        if (lintReport.length !== Object.keys(fnMap).length) {
            this.logger.error(`ESLint and istanbul report differing number of functions for file '${sourcePath}'.`);
            return {};
        }

        Object.keys(fnMap).forEach((key, index) => {
            const coverageFunction = fnMap[key];
            const lintFunction = lintReport[index];
            if (!lintFunction) {
                this.logger.error(`Function '${coverageFunction.name}' not found in ESLint data.`);
                return;
            }

            const coverageData = getCoverageForFunction({
                functionId: key,
                fileCoverage,
            });
            const { covered: coveredStatements, total: totalStatements } = coverageData;
            const coverage = totalStatements === 0 ? 1 : coveredStatements / totalStatements;

            const complexity = lintFunction?.complexity;

            const crapScore = crap({ complexity, coverage });

            // TODO: add location, so it's more useful with anonymous functions
            // TODO: add human readable descriptor (function at line X, function Y)
            // TODO: what else to add from `lintFunction`?
            result[coverageFunction.name] = {
                complexity,
                functionDescriptor: lintFunction.functionName,
                // TODO: which location to use, istanbul's or ESLint's? -> add log if different
                line: lintFunction.line,
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
