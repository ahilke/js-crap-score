import { Injectable } from "@nestjs/common";
import Handlebars from "handlebars";
import { join } from "path";
import { ConfigService } from "../crap/config.service.js";
import { CrapFunction, CrapReport } from "../crap/crap-report.js";
import { FileSystemService } from "../crap/file-system.service.js";

@Injectable()
export class HtmlReportService {
    public constructor(
        private readonly fileSystemService: FileSystemService,
        private readonly configService: ConfigService,
    ) {}

    public async createReport(crapReport: CrapReport): Promise<void> {
        const { htmlReportDir } = this.configService.config;
        if (!htmlReportDir) {
            throw new Error("No HTML report directory specified.");
        }

        await this.initHandlebars();

        const functions: FunctionReport[] = [];
        Object.entries(crapReport).forEach(([filePath, fileReport]) => {
            Object.values(fileReport).forEach((functionReport, fileIndex) => {
                functions.push({ ...functionReport, filePath, fileIndex });
            });
        });
        functions.sort((a, b) => b.statements.crap - a.statements.crap);
        const pageTemplate = await this.fileSystemService.loadHandlebarsTemplate("../html-report/template/page.hbs");
        await Promise.all(
            functions.map(async (functionReport) => {
                const html = pageTemplate({
                    ...functionReport,
                    content: "function",
                    title: `CRAP: ${functionReport.functionDescriptor} - ${functionReport.filePath}`,
                });

                this.fileSystemService.writeHtmlReport(
                    join(htmlReportDir, functionReport.filePath, `${functionReport.fileIndex}.html`),
                    html,
                );
            }),
        );

        const result = pageTemplate({ functions, content: "overview", title: "CRAP" });

        await this.fileSystemService.writeHtmlReport(join(htmlReportDir, "report.html"), result);
    }

    private async initHandlebars(): Promise<void> {
        Handlebars.registerHelper("decimal", (x: number): string => x.toFixed(2));
        Handlebars.registerHelper(
            "functionReportPath",
            (filePath: string, fileIndex: number): string => `.${filePath}/${fileIndex}.html`,
        );

        Handlebars.registerPartial(
            "overview",
            await this.fileSystemService.loadHandlebarsTemplate("../html-report/template/overview.hbs"),
        );
        Handlebars.registerPartial(
            "function",
            await this.fileSystemService.loadHandlebarsTemplate("../html-report/template/function.hbs"),
        );
    }
}

interface FunctionReport extends CrapFunction {
    filePath: string;
    /**
     * Position of the function in the file.
     */
    fileIndex: number;
}
