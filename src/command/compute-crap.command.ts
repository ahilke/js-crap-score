import { Logger } from "@nestjs/common";
import { JSHINT } from "jshint";
import { CommandRunner, InquirerService, RootCommand } from "nest-commander";
import { crap } from "../computation/crap-score.js";
import { getCoverageForFunction } from "../computation/function-coverage.js";
import { FileSystemService } from "../file-system.service.js";

@RootCommand({
    arguments: "[testCoveragePath]",
})
export class ComputeCrapCommand extends CommandRunner {
    public constructor(
        private readonly inquirer: InquirerService,
        private readonly fileSystemService: FileSystemService,
        private readonly logger: Logger,
    ) {
        super();
    }

    public async run(inputs: string[]): Promise<void> {
        const testCoveragePath = await this.getTestCoveragePath(inputs);
        const coverageReport = this.fileSystemService.loadCoverageReport(testCoveragePath);

        Object.values(coverageReport).forEach((fileCoverage) => {
            const { fnMap, path: sourcePath } = fileCoverage;
            const source = this.fileSystemService.loadSourceFile(sourcePath);

            JSHINT(source);
            const jshintData = JSHINT.data()?.functions;

            Object.entries(fnMap).forEach(([id, { name: functionName }]) => {
                // TODO: probably should not pass the whole `fileCoverage`?
                const coverage = getCoverageForFunction({
                    functionId: id,
                    fileCoverage,
                });
                const jshintFunctionData = jshintData?.find(({ name }) => name === functionName);
                const complexity = jshintFunctionData?.metrics.complexity;

                if (complexity) {
                    this.logger.log(`Function '${functionName}' is ${coverage * 100}%} covered.`);
                    this.logger.log(`Function '${functionName}' has complexity ${complexity}.`);
                    this.logger.log(
                        `Function '${functionName}' has CRAP score of ${crap({
                            complexity,
                            coverage,
                        })}.`,
                    );
                } else {
                    this.logger.error(`Function '${functionName}' not found in JSHint data.`);
                }
            });
        });
    }

    private async getTestCoveragePath(inputs: string[]): Promise<string> {
        if (inputs[0]) {
            return inputs[0];
        }

        const answers = await this.inquirer.ask<{ testCoveragePath: string }>(
            "test-coverage-path-questions",
            undefined,
        );
        return answers.testCoveragePath;
    }
}
