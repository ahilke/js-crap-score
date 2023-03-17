import { Injectable } from "@nestjs/common";
import handlebars from "handlebars";
import { CrapFunction, CrapReport } from "../crap/crap-report.service.js";
import { FileSystemService } from "../crap/file-system.service.js";

handlebars.registerHelper("decimal", (x: number): string => x.toFixed(2));

@Injectable()
export class HtmlReportService {
    public constructor(private readonly fileSystemService: FileSystemService) {}

    public async createReport(crapReport: CrapReport): Promise<void> {
        const functions: FunctionReport[] = [];
        Object.entries(crapReport).forEach(([filePath, fileReport]) => {
            Object.values(fileReport).forEach((functionReport) => {
                functions.push({ ...functionReport, filePath });
            });
        });
        functions.sort((a, b) => b.statements.crap - a.statements.crap);

        // TODO: use other method to load template - should also not depend on location of caller
        const templateSource = await this.fileSystemService.loadSourceFile("../html-report/template.hbs");
        const template = handlebars.compile(templateSource);
        const result = template({ functions });

        // TODO: use other method to write report
        await this.fileSystemService.writeHtmlReport("./crap-report/report.html", result);
    }
}

interface FunctionReport extends CrapFunction {
    filePath: string;
}
