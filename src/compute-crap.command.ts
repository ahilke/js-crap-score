import { Logger } from "@nestjs/common";
import { JSHINT } from "jshint";
import { CommandRunner, RootCommand } from "nest-commander";
import { crap } from "./crap-score.js";
import { FileSystemService } from "./file-system.service.js";
import { getCoverageForFunction } from "./function-coverage.js";

@RootCommand({})
export class ComputeCrapCommand extends CommandRunner {
    public constructor(private readonly logger: Logger, private readonly fileSystemService: FileSystemService) {
        super();
    }

    public async run(): Promise<void> {
        const coverageReport = this.fileSystemService.loadCoverageReport("../../test/coverage/coverage-final.json");

        Object.values(coverageReport).forEach((fileCoverage) => {
            const { fnMap, path: sourcePath } = fileCoverage;
            const source = this.fileSystemService.loadSourceFile(sourcePath);

            JSHINT(source);
            const jshintData = JSHINT.data()?.functions;

            Object.entries(fnMap).forEach(([id, { name: functionName }]) => {
                // TODO: probably should not pass the whole `fileCoverage`?
                const coverage = getCoverageForFunction({ functionId: id, fileCoverage });
                const jshintFunctionData = jshintData?.find(({ name }) => name === functionName);
                const complexity = jshintFunctionData?.metrics.complexity;

                if (complexity) {
                    this.logger.log(`Function '${functionName}' is ${coverage * 100}%} covered.`);
                    this.logger.log(`Function '${functionName}' has complexity ${complexity}.`);
                    this.logger.log(`Function '${functionName}' has CRAP score of ${crap({ complexity, coverage })}.`);
                } else {
                    this.logger.error(`Function '${functionName}' not found in JSHint data.`);
                }
            });
        });
    }
}
