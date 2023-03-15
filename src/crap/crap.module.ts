import { Logger, Module } from "@nestjs/common";
import { ComplexityService } from "./complexity.service.js";
import { CrapReportService } from "./crap-report.service.js";
import { FileSystemService } from "./file-system.service.js";

@Module({
    providers: [CrapReportService, Logger, FileSystemService, ComplexityService],
    exports: [CrapReportService, Logger, FileSystemService],
})
export class CrapModule {}
