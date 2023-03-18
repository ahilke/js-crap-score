import { Injectable } from "@nestjs/common";
import handlebars from "handlebars";
import { CrapFunction, CrapReport } from "../crap/crap-report.service.js";
import { FileSystemService } from "../crap/file-system.service.js";

handlebars.registerHelper("decimal", (x: number): string => x.toFixed(2));
handlebars.registerHelper(
    "functionReportPath",
    (filePath: string, fileIndex: number): string => `.${filePath}/${fileIndex}.html`,
);

@Injectable()
export class HtmlReportService {
    public constructor(private readonly fileSystemService: FileSystemService) {}

    public async createReport(crapReport: CrapReport): Promise<void> {
        const functions: FunctionReport[] = [];
        Object.entries(crapReport).forEach(([filePath, fileReport]) => {
            Object.values(fileReport).forEach((functionReport, fileIndex) => {
                functions.push({ ...functionReport, filePath, fileIndex });
            });
        });
        functions.sort((a, b) => b.statements.crap - a.statements.crap);
        const functionTemplate = await this.fileSystemService.loadHandlebarsTemplate("../html-report/function.hbs");
        await Promise.all(
            functions.map(async (functionReport) => {
                const html = functionTemplate(functionReport);
                this.fileSystemService.writeHtmlReport(
                    `./crap-report/${functionReport.filePath}/${functionReport.fileIndex}.html`,
                    html,
                );
            }),
        );

        const indexTemplate = await this.fileSystemService.loadHandlebarsTemplate("../html-report/index.hbs");
        const result = indexTemplate({ functions });

        await this.fileSystemService.writeHtmlReport("./crap-report/report.html", result);
    }
}

interface FunctionReport extends CrapFunction {
    filePath: string;
    /**
     * Position of the function in the file.
     */
    fileIndex: number;
}
