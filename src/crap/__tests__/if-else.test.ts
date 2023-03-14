import { beforeAll, describe, expect, test } from "@jest/globals";
import { Test } from "@nestjs/testing";
import { CoverageMapData } from "istanbul-lib-coverage";
import { CrapReportService } from "../crap-report.service.js";
import { CrapModule } from "../crap.module.js";
import { FileSystemService } from "../file-system.service.js";

describe("if-else", () => {
    let fileSystemService: FileSystemService;
    let crapReportService: CrapReportService;
    let coverageReport: CoverageMapData;

    beforeAll(async () => {
        const appModule = await Test.createTestingModule({
            imports: [CrapModule],
        }).compile();

        fileSystemService = appModule.get(FileSystemService);
        crapReportService = appModule.get(CrapReportService);

        coverageReport = fileSystemService.loadCoverageReport("../../test-data/coverage/coverage-final.json");
    });

    test("setup", () => {
        expect(coverageReport).toBeDefined();
    });
});
