import { CommandRunner, InquirerService, RootCommand } from "nest-commander";
import { CrapReportService } from "../crap/crap-report.service.js";
import { FileSystemService } from "../crap/file-system.service.js";

@RootCommand({
    arguments: "[testCoveragePath]",
})
export class ComputeCrapCommand extends CommandRunner {
    private crapReportPath = "./crap-report.json";

    public constructor(
        private readonly inquirer: InquirerService,
        private readonly crapReportService: CrapReportService,
        private readonly fileSystemService: FileSystemService,
    ) {
        super();
    }

    public async run(inputs: string[]): Promise<void> {
        const testCoveragePath = await this.getTestCoveragePath(inputs);
        const coverageReport = this.fileSystemService.loadCoverageReport(testCoveragePath);

        await this.crapReportService.createReport({
            testCoverage: coverageReport,
            options: { writeReportAt: this.crapReportPath },
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
