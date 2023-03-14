import { Logger, Module } from "@nestjs/common";
import { CrapReportService } from "./crap-report.service.js";
import { FileSystemService } from "./file-system.service.js";

@Module({
    providers: [CrapReportService, Logger, FileSystemService],
    exports: [CrapReportService, Logger, FileSystemService],
})
export class CrapModule {}
