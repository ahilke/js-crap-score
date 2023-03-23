import { Logger } from "@nestjs/common";
import { CommandRunner, InquirerService, Option, RootCommand } from "nest-commander";
import { ConfigService } from "../crap/config.service.js";
import { CrapReportService } from "../crap/crap-report.service.js";
import { FileSystemService } from "../crap/file-system.service.js";
import { HtmlReportService } from "../crap/html-report/html-report.service.js";

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
        private readonly logger: Logger,
    ) {
        super();
    }

    public async run(
        inputs: string[],
        options: {
            json?: string | true;
            html?: string | true;
        },
    ): Promise<void> {
        this.processOptions(options);

        const testCoveragePath = await this.getTestCoveragePath(inputs);
        const coverageReport = await this.fileSystemService.loadCoverageReport(testCoveragePath);

        const result = await this.crapReportService.createReport({ testCoverage: coverageReport });

        if (this.configService.config.htmlReportDir) {
            await this.htmlReportService.createReport(result);
        }
    }

    @Option({
        flags: "--json [jsonReportFile]",
        description:
            "Specifies file path where the JSON report will be written to. Defaults to './crap-report/crap-report.json'. If undefined, no JSON report is written.",
    })
    public parseJsonReportFile(jsonReportFile: string): string {
        return jsonReportFile;
    }

    @Option({
        flags: "--html [htmlReportDir]",
        description:
            "Specifies directory path where the HTML report will be written to. Defaults to './crap-report/html/'. If undefined, no HTML report is written.",
    })
    public parseHtmlReportDir(htmlReportDir: string): string {
        return htmlReportDir;
    }

    private processOptions(options: { json?: string | true; html?: string | true }): void {
        this.configService.config.jsonReportFile =
            options.json === true ? "./crap-report/crap-report.json" : options.json;
        this.configService.config.htmlReportDir = options.html === true ? "./crap-report/html/" : options.html;
        if (
            this.configService.config.jsonReportFile == undefined &&
            this.configService.config.htmlReportDir == undefined
        ) {
            this.logger.warn("No report will be written. Use --json or --html to specify where to write the report.");
        }
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
