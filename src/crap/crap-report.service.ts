import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData, FileCoverageData } from "istanbul-lib-coverage";
import { JSHINT } from "jshint";
import { getComplexity } from "../command/eslint-complexity.js";
import { crap } from "../computation/crap-score.js";
import { getCoverageForFunction } from "../computation/function-coverage.js";
import { FileSystemService } from "./file-system.service.js";

@Injectable()
export class CrapReportService {
    public constructor(private readonly logger: Logger, private readonly fileSystemService: FileSystemService) {}

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

    private async processFile({ fileCoverage }: { fileCoverage: FileCoverageData }): Promise<CrapFile> {
        const result: CrapFile = {};

        const { fnMap, path: sourcePath } = fileCoverage;
        const source = this.fileSystemService.loadSourceFile(sourcePath);

        const lintReport = await getComplexity({ sourceCode: source });
        if (lintReport.length !== Object.keys(fnMap).length) {
            this.logger.error(`ESLint and istanbul report differing number of functions for file '${sourcePath}'.`);
            return {};
        }

        Object.keys(fnMap).forEach((key, index) => {
            const { name: functionName } = fnMap[key];
            const lintFunction = lintReport[index];

            const coverageData = getCoverageForFunction({
                functionId: key,
                fileCoverage,
            });
            const coverage = coverageData.covered / coverageData.total;
            const complexity = lintFunction?.complexity;
            if (!complexity) {
                this.logger.error(`Function '${functionName}' not found in ESLint data.`);
                return;
            }

            const crapScore = crap({ complexity, coverage });

            // TODO: add location, so it's more useful with anonymous functions
            // TODO: add human readable descriptor (function at line X, function Y)
            // TODO: what else to add from `lintFunction`?
            result[functionName] = {
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

            this.logger.debug(`Computed CRAP score for '${functionName}'.`, {
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
