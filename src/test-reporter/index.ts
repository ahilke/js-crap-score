import type { Config, Reporter, ReporterContext, TestContext } from "@jest/reporters";
import type { AggregatedResult } from "@jest/test-result";
import type { LogLevel } from "@nestjs/common";
import { getCrapReport } from "../index.js";
import { CrapReporterLogger } from "./logger.js";

export interface ReporterOptions {
    /**
     * Specifies path where the JSON report will be written to.
     * If undefined, no report is written to the disk.
     */
    jsonReportFile?: string;
    /**
     * Specifies path where the HTML report will be written to.
     * If undefined, no report is written to the disk.
     */
    htmlReportDir?: string;
    /**
     * Changes log behaviour:
     *  - silent: suppress all logs
     *  - debug: print additional logs
     */
    log?: "silent" | "debug";
}

/**
 * @see https://jestjs.io/docs/configuration#custom-reporters
 */
export default class CrapReporter implements Reporter {
    private readonly logger: CrapReporterLogger;

    private readonly jsonReportFile: string | undefined;
    private readonly htmlReportDir: string | undefined;

    public constructor(
        private readonly globalConfig: Config.GlobalConfig,
        reporterOptions: ReporterOptions,
        private readonly reporterContext: ReporterContext,
    ) {
        this.jsonReportFile = reporterOptions.jsonReportFile;
        this.htmlReportDir = reporterOptions.htmlReportDir;

        this.logger = new CrapReporterLogger(this.getLogLevels(reporterOptions.log));
    }

    public onRunStart(): void {}

    public async onRunComplete(testContext: Set<TestContext>, results: AggregatedResult): Promise<void> {
        if (results.coverageMap == undefined) {
            this.logger.log(
                "No test coverage found, skipping generation of crap report. Did you enable `collectCoverage`?",
            );
            return;
        }

        await getCrapReport({
            testCoverage: results.coverageMap.data,
            jsonReportFile: this.jsonReportFile,
            htmlReportDir: this.htmlReportDir,
            log: this.logger,
        });
    }

    public getLastError(): Error | undefined {
        const lastError = this.logger.getLastError();
        if (lastError == undefined) {
            return undefined;
        }

        return new Error(lastError);
    }

    private getLogLevels(log: "silent" | "debug" | undefined): LogLevel[] {
        switch (log) {
            case "silent":
                return [];
            case "debug":
                return ["log", "warn", "error", "debug"];
            default:
                return ["log", "warn", "error"];
        }
    }
}
