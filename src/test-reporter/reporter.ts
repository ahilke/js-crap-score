import type { Config, Reporter, ReporterContext, TestContext } from "@jest/reporters";
import type { AggregatedResult } from "@jest/test-result";
import type { LogLevel } from "@nestjs/common";
import { getCrapReport } from "../api/crap-report.js";
import { CrapReporterLogger } from "./logger.js";

export interface ReporterOptions {
    /**
     * Specifies path where the JSON report will be written to.
     * Defaults to `crap-report/crap-report.json`. Pass `false` to disable JSON report.
     */
    jsonReportFile?: string | false;
    /**
     * Specifies path where the HTML report will be written to.
     * Defaults to `crap-report/html/`. Pass `false` to disable HTML report.
     */
    htmlReportDir?: string | false;
    /**
     * Changes log behaviour:
     *  - silent: suppress all logs
     *  - debug: print additional logs
     */
    log?: "silent" | "debug";
}

/**
 * Custom jest reporter that generates a CRAP report when run with `jest --coverage`.
 *
 * @see https://jestjs.io/docs/configuration#custom-reporters
 */
export class CrapReporter implements Reporter {
    private readonly logger: CrapReporterLogger;

    private readonly jsonReportFile: string | undefined;
    private readonly htmlReportDir: string | undefined;

    public constructor(
        private readonly globalConfig: Config.GlobalConfig,
        reporterOptions: ReporterOptions,
        private readonly reporterContext: ReporterContext,
    ) {
        this.jsonReportFile = this.getJsonReportFile(reporterOptions.jsonReportFile);
        this.htmlReportDir = this.getHtmlReportDir(reporterOptions.htmlReportDir);

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

    private getLogLevels(log: unknown): LogLevel[] {
        if (log === undefined) {
            return ["log", "warn", "error"];
        }
        if (log === "silent") {
            return [];
        }
        if (log === "debug") {
            return ["log", "warn", "error", "debug"];
        }
        throw new Error(`Invalid option "log": ${log}`);
    }

    private getJsonReportFile(value: unknown): string | undefined {
        if (value === undefined) {
            return "crap-report/crap-report.json";
        }
        if (value === false) {
            return undefined;
        }
        if (typeof value === "string") {
            return value;
        }
        throw new Error(`Invalid option "jsonReportFile": ${value}`);
    }

    private getHtmlReportDir(value: unknown): string | undefined {
        if (value === undefined) {
            return "crap-report/html/";
        }
        if (value === false) {
            return undefined;
        }
        if (typeof value === "string") {
            return value;
        }
        throw new Error(`Invalid option "htmlReportDir": ${value}`);
    }
}
