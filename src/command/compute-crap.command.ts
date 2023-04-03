import { Logger, LogLevel } from "@nestjs/common";
import { CommandRunner, Help, InquirerService, Option, RootCommand } from "nest-commander";
import { ConfigService } from "../crap/config.service.js";
import { CrapReportService } from "../crap/crap-report.service.js";
import { FileSystemService } from "../crap/file-system.service.js";

@RootCommand({
    arguments: "[testCoveragePath]",
    description: "Calculate and visualize the CRAP score of a JS/TS project.",
})
export class ComputeCrapCommand extends CommandRunner {
    public constructor(
        private readonly inquirer: InquirerService,
        private readonly crapReportService: CrapReportService,
        private readonly fileSystemService: FileSystemService,
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
            verbosity?: LogLevel[];
        },
    ): Promise<void> {
        this.processOptions(options);

        const testCoveragePath = await this.getTestCoveragePath(inputs);
        const coverageReport = await this.fileSystemService.loadCoverageReport(testCoveragePath);

        const result = await this.crapReportService.createReport({ testCoverage: coverageReport });
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

    @Option({
        flags: "-v, --verbosity <verbosity>",
        description:
            "Minimum verbosity/log level. Defaults to 'warn'. Use 'silent' to disable logging. Choices: 'silent', 'error', 'warn', 'log', 'debug'.",
    })
    public parseVerbosity(verbosity: string): string[] {
        const logLevels = this.getLogLevels();
        const index = logLevels.indexOf(verbosity);
        if (index === -1) {
            throw new Error(`Invalid log level: ${verbosity}. Valid log levels are: ${logLevels.join(", ")}.`);
        }

        if (verbosity === "silent") {
            return [];
        }

        return logLevels.reverse().slice(logLevels.indexOf(verbosity));
    }

    public getLogLevels(): string[] {
        return ["error", "warn", "log", "debug", "silent"];
    }

    @Option({
        flags: "-h, --help",
        description: "Display this help message.",
    })
    public helpMessage(): void {
        this.command.help();
    }

    @Help("afterAll")
    public helpMessageExamples(): string {
        return [
            "",
            "Examples:",
            "  crap --html",
            "  crap --html -- ./coverage/coverage-final.json        # use `--` to separate options from coverage path when not passing a value to `--html`",
            "  crap ./coverage/coverage-final.json --html",
            "  crap --html ./html/ ./coverage/coverage-final.json",
            "  crap --html=./html/ ./coverage/coverage-final.json",
        ].join("\n");
    }

    private processOptions(options: { json?: string | true; html?: string | true; verbosity?: LogLevel[] }): void {
        this.configService.setJsonReportFile(options.json === true ? "crap-report/crap-report.json" : options.json);
        this.configService.setHtmlReportDir(options.html === true ? "crap-report/html/" : options.html);

        if (options.verbosity != undefined) {
            this.configService.setLogger(options.verbosity);
        }

        if (this.configService.getJsonReportFile() == undefined && this.configService.getHtmlReportDir() == undefined) {
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
