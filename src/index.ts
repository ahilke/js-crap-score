import { NestFactory } from "@nestjs/core";
import { CoverageMapData } from "istanbul-lib-coverage";
import { CrapReport } from "./crap/crap-report.js";
import { CrapReportService } from "./crap/crap-report.service.js";
import { CrapModule } from "./crap/crap.module.js";
import { FileSystemService } from "./crap/file-system.service.js";

export interface CrapReportOptions {
    /**
     * Test coverage used as input for the CRAP report.
     * Either a path of file URL to the coverage report (relative to the current working directory)
     *  or the coverage report itself.
     */
    testCoverage: string | URL | CoverageMapData;
}

/**
 * Generate a CRAP report for a given project based on its test coverage.
 *
 * Optionally, save a JSON or HTML report additionally.
 */
export async function getCrapReport({ testCoverage }: CrapReportOptions): Promise<CrapReport> {
    const app = await NestFactory.create(CrapModule);
    const crapReportService = app.get(CrapReportService);

    let coverageReport: CoverageMapData;
    if (typeof testCoverage === "string" || testCoverage instanceof URL) {
        const fileSystemService = app.get(FileSystemService);
        coverageReport = await fileSystemService.loadCoverageReport(testCoverage);
    } else {
        coverageReport = testCoverage;
    }

    const report = await crapReportService.createReport({ testCoverage: coverageReport });

    await app.close();

    return report;
}

export { CrapFile, CrapFunction, CrapReport } from "./crap/crap-report.js";

