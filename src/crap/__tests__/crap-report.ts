import { beforeAll, describe, expect, it } from "@jest/globals";
import { Test } from "@nestjs/testing";
import { CrapFile, CrapFunction, CrapReport } from "../crap-report.js";
import { CrapReportService } from "../crap-report.service.js";
import { CrapModule } from "../crap.module.js";
import { FileSystemService } from "../file-system.service.js";
import { cjsTestCases } from "./cjs/index.js";
import { esmTestCases } from "./esm/index.js";

const testProjects = ["cjs", "esm"] as const;

type TestProject = (typeof testProjects)[number];

/**
 * Standardized test case to assert CRAP report for a given function.
 */
export interface CrapReportTest {
    project: TestProject;
    /**
     * Path to the file containing the function relative to `test-data` directory.
     */
    filePath: string;
    /**
     * Name of the function as reported by istanbul in `fnMap`.
     */
    istanbulFunctionName: string;
    /**
     * Expected CRAP report for the function.
     */
    expectedReport: CrapFunction;
}

describe("CrapReportService", () => {
    describe("getReport", () => {
        let crapReports: Record<TestProject, CrapReport | undefined> = {
            cjs: undefined,
            esm: undefined,
        };

        beforeAll(async () => {
            const appModule = await Test.createTestingModule({
                imports: [CrapModule],
            }).compile();

            const fileSystemService = appModule.get(FileSystemService);
            const crapReportService = appModule.get(CrapReportService);

            const crapReportPromises = testProjects.map(async (project) => {
                const coverageReport = await fileSystemService.loadCoverageReport(
                    new URL(`../../../test-data/${project}/coverage/coverage-final.json`, import.meta.url),
                );

                crapReports[project] = await crapReportService.createReport({ testCoverage: coverageReport });
            });

            await Promise.all(crapReportPromises);
        });

        it.each<CrapReportTest>([...cjsTestCases, ...esmTestCases])(
            "$project/$filePath::$expectedReport.functionDescriptor",
            async ({ project, filePath, istanbulFunctionName, expectedReport }) => {
                const crapReport = crapReports[project];
                expect(crapReport).toBeDefined();

                const crapFile = findFileInCrapReport(crapReport!, filePath);
                expect(crapFile).toBeDefined();

                // Asserting keys, as this gives a better error message if it fails compared to just checking `expect(crapFunction).toBeDefined()`.
                expect(Object.keys(crapFile!)).toContain(istanbulFunctionName);
                expect(crapFile?.[istanbulFunctionName]).toStrictEqual(expectedReport);
            },
        );
    });
});

function findFileInCrapReport(crapReport: CrapReport, projectPath: string): CrapFile | undefined {
    const sourcePath = Object.keys(crapReport).find((sourcePath) => sourcePath.endsWith(projectPath));
    return sourcePath ? crapReport[sourcePath] : undefined;
}
