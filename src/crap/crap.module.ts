import { Logger, Module } from "@nestjs/common";
import { HtmlReportService } from "./html-report/html-report.service.js";
import { ComplexityService } from "./complexity.service.js";
import { ConfigService } from "./config.service.js";
import { CrapReportService } from "./crap-report.service.js";
import { FileSystemService } from "./file-system.service.js";

@Module({
    providers: [CrapReportService, Logger, FileSystemService, HtmlReportService, ConfigService, ComplexityService],
    exports: [CrapReportService, Logger, FileSystemService, HtmlReportService, ConfigService],
})
export class CrapModule {}
