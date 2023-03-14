import { Test } from "@nestjs/testing";
import { CrapFile, CrapReport, CrapReportService } from "../crap-report.service.js";
import { CrapModule } from "../crap.module.js";
import { FileSystemService } from "../file-system.service.js";

let crapReport: CrapReport | undefined;

export async function getCrapReport(): Promise<CrapReport> {
    if (crapReport) {
        return crapReport;
    }

    const appModule = await Test.createTestingModule({
        imports: [CrapModule],
    }).compile();

    const fileSystemService = appModule.get(FileSystemService);
    const crapReportService = appModule.get(CrapReportService);

    const coverageReport = fileSystemService.loadCoverageReport("../../test-data/coverage/coverage-final.json");
    return crapReportService.createReport({ testCoverage: coverageReport });
}

export function findFileInCrapReport(crapReport: CrapReport, projectPath: string): CrapFile | undefined {
    const sourcePath = Object.keys(crapReport).find((sourcePath) => sourcePath.endsWith(projectPath));
    return sourcePath ? crapReport[sourcePath] : undefined;
}
