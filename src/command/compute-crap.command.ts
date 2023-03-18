import { CommandRunner, InquirerService, RootCommand } from "nest-commander";
import { ConfigService } from "../crap/config.service.js";
import { CrapReportService } from "../crap/crap-report.service.js";
import { FileSystemService } from "../crap/file-system.service.js";
import { HtmlReportService } from "../html-report/html-report.service.js";

@RootCommand({
    arguments: "[testCoveragePath]",
})
export class ComputeCrapCommand extends CommandRunner {
    public constructor(
        private readonly inquirer: InquirerService,
        private readonly crapReportService: CrapReportService,
        private readonly fileSystemService: FileSystemService,
        private readonly htmlReportService: HtmlReportService,
        private readonly configService: ConfigService,
    ) {
        super();
    }

    public async run(inputs: string[]): Promise<void> {
        this.configService.config.jsonReportFile = "./crap-report/crap-report.json";
        this.configService.config.htmlReportDir = "./crap-report/html/";

        const testCoveragePath = await this.getTestCoveragePath(inputs);
        const coverageReport = await this.fileSystemService.loadCoverageReport(testCoveragePath);

        const result = await this.crapReportService.createReport({ testCoverage: coverageReport });

        await this.htmlReportService.createReport(result);
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
