import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData } from "istanbul-lib-coverage";
import { JSHINT } from "jshint";
import { crap } from "./computation/crap-score.js";
import { getCoverageForFunction } from "./computation/function-coverage.js";
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
            Object.entries(fnMap).forEach(([id, { name: functionName }]) => {
                const coverageData = getCoverageForFunction({
                    functionId: id,
                    fileCoverage,
                });
                const coverage = coverageData.covered / coverageData.total;

                const jshintFunctionData = jshintData?.find(({ name }) => name === functionName);
                const complexity = jshintFunctionData?.metrics.complexity;

                if (complexity) {
                    const crapScore = crap({ complexity, coverage });
                    result[sourcePath][functionName] = {
                        complexity,
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
                } else {
                    this.logger.error(`Function '${functionName}' not found in JSHint data.`);
                }
            });
        });

        return result;
    }
}

export interface CrapReport {
    [sourcePath: string]: {
        [functionName: string]: {
            complexity: number;
            statements: {
                covered: number;
                total: number;
                coverage: number;
                crap: number;
            };
        };
    };
}
