import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData } from "istanbul-lib-coverage";
import { JSHINT } from "jshint";
import { crap } from "./crap-score.js";
import { getCoverageForFunction } from "./function-coverage.js";
import { getLintFunctionForCoverageFunction } from "./map-lint-and-coverage-data.js";
import { FileSystemService } from "./file-system.service.js";

@Injectable()
export class CrapReportService {
    public constructor(private readonly logger: Logger, private readonly fileSystemService: FileSystemService) {}

    public createReport({ testCoverage }: { testCoverage: CoverageMapData }): CrapReport {
        const result: CrapReport = {};

        Object.values(testCoverage).forEach((fileCoverage) => {
            const { fnMap, path: sourcePath } = fileCoverage;
            const source = this.fileSystemService.loadSourceFile(sourcePath);

            JSHINT(source);
            const jshintData = JSHINT.data()?.functions;

            result[sourcePath] = {};
            Object.entries(fnMap).forEach(([id, functionMapping]) => {
                const { name: coverageFunctionName } = functionMapping;

                const coverageData = getCoverageForFunction({
                    functionId: id,
                    fileCoverage,
                });
                const coverage = coverageData.covered / coverageData.total;

                const jshintFunctionData = getLintFunctionForCoverageFunction({
                    coverageFunction: functionMapping,
                    lintData: jshintData,
                });
                if (!jshintFunctionData) {
                    this.logger.error(`Function '${coverageFunctionName}' not found in JSHint data.`);
                    return;
                }

                const complexity = jshintFunctionData.metrics.complexity;
                const crapScore = crap({ complexity, coverage });

                // JSHint generally reports better names and less anonymous, so use it for the final report
                const lintFunctionName = jshintFunctionData.name;
                result[sourcePath][lintFunctionName] = {
                    complexity,
                    statements: {
                        ...coverageData,
                        coverage,
                        crap: crapScore,
                    },
                };

                this.logger.debug(`Computed CRAP score for '${coverageFunctionName}'.`, {
                    coverage,
                    complexity,
                    crapScore,
                });
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
    statements: {
        covered: number;
        total: number;
        coverage: number;
        crap: number;
    };
}
