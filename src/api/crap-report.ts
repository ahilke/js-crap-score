import { LoggerService, LogLevel } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { CoverageMapData } from "istanbul-lib-coverage";
import { ConfigService } from "../crap/config.service.js";
import { CrapReport } from "../crap/crap-report.js";
import { CrapReportService } from "../crap/crap-report.service.js";
import { CrapModule } from "../crap/crap.module.js";
import { FileSystemService } from "../crap/file-system.service.js";

export interface CrapReportOptions {
    /**
     * Test coverage used as input for the CRAP report.
     * Either a path of file URL to the coverage report (relative to the current working directory)
     *  or the coverage report itself.
     */
    testCoverage: string | URL | CoverageMapData;
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
    log?: LogLevel[] | LoggerService;
}

/**
 * Generate a CRAP report for a given project based on its test coverage.
 *
 * Optionally, save a JSON or HTML report additionally.
 */
export async function getCrapReport({
    testCoverage,
    jsonReportFile,
    htmlReportDir,
    log,
}: CrapReportOptions): Promise<CrapReport> {
    const app = await NestFactory.create(CrapModule, { logger: [] });

    const configService = app.get(ConfigService);
    configService.setJsonReportFile(jsonReportFile);
    configService.setHtmlReportDir(htmlReportDir);
    if (log) {
        configService.setLogger(log);
    }

    let coverageReport: CoverageMapData;
    if (typeof testCoverage === "string" || testCoverage instanceof URL) {
        const fileSystemService = app.get(FileSystemService);
        coverageReport = await fileSystemService.loadCoverageReport(testCoverage);
    } else {
        coverageReport = testCoverage;
    }

    const crapReportService = app.get(CrapReportService);
    const report = await crapReportService.createReport({ testCoverage: coverageReport });

    await app.close();

    return report;
}
