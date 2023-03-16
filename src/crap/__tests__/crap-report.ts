import { expect } from "@jest/globals";
import { Test } from "@nestjs/testing";
import { CrapFile, CrapFunction, CrapReport, CrapReportService } from "../crap-report.service.js";
import { CrapModule } from "../crap.module.js";
import { FileSystemService } from "../file-system.service.js";

let crapReport: CrapReport | undefined;

/**
 * Standardized test case to assert CRAP report for a given function.
 *
 * @param filePath              Path to the file containing the function relative to `test-data`.
 * @param istanbulFunctionName  Name of the function as reported by istanbul in `fnMap`.
 * @param expectedReport        Expected CRAP report for the function.
 */
export function testCrapFunctionReport({
    filePath,
    istanbulFunctionName,
    expectedReport,
}: {
    filePath: string;
    istanbulFunctionName: string;
    expectedReport: CrapFunction;
}) {
    return async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, `test-data/${filePath}`);

        expect(crapFile).toBeDefined();
        // Asserting keys, as this gives a better error message if it fails rather than just checking `toBeDefined()`
        expect(Object.keys(crapFile!)).toContain(istanbulFunctionName);
        expect(crapFile?.[istanbulFunctionName]).toStrictEqual(expectedReport);
    };
}

async function getCrapReport(): Promise<CrapReport> {
    if (crapReport) {
        return crapReport;
    }

    const appModule = await Test.createTestingModule({
        imports: [CrapModule],
    }).compile();

    const fileSystemService = appModule.get(FileSystemService);
    const crapReportService = appModule.get(CrapReportService);

    const coverageReport = fileSystemService.loadCoverageReport("../../test-data/coverage/coverage-final.json");
    crapReport = await crapReportService.createReport({ testCoverage: coverageReport });
    return crapReport;
}

function findFileInCrapReport(crapReport: CrapReport, projectPath: string): CrapFile | undefined {
    const sourcePath = Object.keys(crapReport).find((sourcePath) => sourcePath.endsWith(projectPath));
    return sourcePath ? crapReport[sourcePath] : undefined;
}
