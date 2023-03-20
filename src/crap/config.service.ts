import { Injectable } from "@nestjs/common";

export interface Config {
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
}

@Injectable()
export class ConfigService {
    public config: Config = {};
}
