import { Injectable, Logger, LogLevel } from "@nestjs/common";

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
    /**
     * Specifies log levels that should be logged. Defaults to `["error", "warn"]`.
     * If empty, no logs are written.
     */
    logLevels: LogLevel[];
}

@Injectable()
export class ConfigService {
    private readonly config: Config = { logLevels: [] };

    public constructor() {
        this.setLogLevels(["error", "warn"]);
    }

    public getJsonReportFile(): string | undefined {
        return this.config.jsonReportFile;
    }

    public setJsonReportFile(jsonReportFile: string | undefined): void {
        this.config.jsonReportFile = jsonReportFile;
    }

    public getHtmlReportDir(): string | undefined {
        return this.config.htmlReportDir;
    }

    public setHtmlReportDir(htmlReportDir: string | undefined): void {
        this.config.htmlReportDir = htmlReportDir;
    }

    public setLogLevels(logLevels: LogLevel[]): void {
        this.config.logLevels = logLevels;
        Logger.overrideLogger(logLevels);
    }
}
