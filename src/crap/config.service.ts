import { Injectable, Logger, LoggerService, LogLevel } from "@nestjs/common";

export interface Config {
    /**
     * Specifies path where the JSON report will be written to.
     * If undefined, no report is written to the disk.
     */
    jsonReportFile?: string | undefined;
    /**
     * Specifies path where the HTML report will be written to.
     * If undefined, no report is written to the disk.
     */
    htmlReportDir?: string | undefined;
}

@Injectable()
export class ConfigService {
    private readonly config: Config = {};

    public constructor() {
        this.setLogger(["error", "warn"]);
    }

    public getJsonReportFile(): string | undefined {
        return this.config.jsonReportFile;
    }

    /**
     * Specifies path where the JSON report will be written to.
     * If undefined, no report is written to the disk.
     */
    public setJsonReportFile(jsonReportFile: string | undefined): void {
        this.config.jsonReportFile = jsonReportFile;
    }

    public getHtmlReportDir(): string | undefined {
        return this.config.htmlReportDir;
    }

    /**
     * Specifies path where the HTML report will be written to.
     * If undefined, no report is written to the disk.
     */
    public setHtmlReportDir(htmlReportDir: string | undefined): void {
        this.config.htmlReportDir = htmlReportDir;
    }

    /**
     * Specifies logger via log levels or a custom logger.
     *
     * If array, specifies log levels that should be logged. Defaults to `["error", "warn"]`.
     * If empty, no logs are written.
     */
    public setLogger(log: LogLevel[] | LoggerService): void {
        Logger.overrideLogger(log);
    }
}
