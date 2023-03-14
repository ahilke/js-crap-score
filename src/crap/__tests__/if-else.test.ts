import { beforeAll, describe, expect, test } from "@jest/globals";
import { Test } from "@nestjs/testing";
import { CrapFile, CrapReport, CrapReportService } from "../crap-report.service.js";
import { CrapModule } from "../crap.module.js";
import { FileSystemService } from "../file-system.service.js";

describe("if-else", () => {
    let crapReport: CrapReport;

    beforeAll(async () => {
        const appModule = await Test.createTestingModule({
            imports: [CrapModule],
        }).compile();

        const fileSystemService = appModule.get(FileSystemService);
        const crapReportService = appModule.get(CrapReportService);

        const coverageReport = fileSystemService.loadCoverageReport("../../test-data/coverage/coverage-final.json");
        crapReport = crapReportService.createReport({ testCoverage: coverageReport });
    });

    test("uncovered", () => {
        const crapFile = findFileInCrapReport(crapReport, "test-data/if-else/uncovered.ts");

        expect(crapFile?.uncovered).toBeDefined();
        expect(crapFile?.uncovered.complexity).toBe(1);
        expect(crapFile?.uncovered.statements).toEqual({
            covered: 0,
            total: 3,
            coverage: 0,
            crap: 2,
        });
    });

    test.each([["ifCovered"], ["elseCovered"]])("%s", (functionName) => {
        const crapFile = findFileInCrapReport(crapReport, `test-data/if-else/${functionName}.ts`);

        expect(crapFile?.[functionName]).toBeDefined();
        expect(crapFile?.[functionName].complexity).toBe(1);
        expect(crapFile?.[functionName].statements).toEqual({
            covered: 2,
            total: 3,
            coverage: 0.6666666666666666,
            crap: 1.037037037037037,
        });
    });

    test("fullyCovered", () => {
        const crapFile = findFileInCrapReport(crapReport, "test-data/if-else/fullyCovered.ts");

        expect(crapFile?.fullyCovered).toBeDefined();
        expect(crapFile?.fullyCovered.complexity).toBe(1);
        expect(crapFile?.fullyCovered.statements).toEqual({
            covered: 3,
            total: 3,
            coverage: 1,
            crap: 1,
        });
    });
});

function findFileInCrapReport(crapReport: CrapReport, projectPath: string): CrapFile | undefined {
    const sourcePath = Object.keys(crapReport).find((sourcePath) => sourcePath.endsWith(projectPath));
    return sourcePath ? crapReport[sourcePath] : undefined;
}
