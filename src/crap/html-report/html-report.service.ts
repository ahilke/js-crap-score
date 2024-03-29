import { Injectable } from "@nestjs/common";
import Handlebars from "handlebars";
import { join } from "path";
import { ConfigService } from "../config.service.js";
import { CrapFunction, CrapReport } from "../crap-report.js";
import { FileSystemService } from "../file-system.service.js";

/* Color Palette, see https://materializeweb.com/color.html
    #fff3e0 orange lighten-5
    #ffe0b2 orange lighten-4
    #ffcc80 orange lighten-3
    #ffb74d orange lighten-2
    #ffa726 orange lighten-1
    #ff9800 orange
    #fb8c00 orange darken-1
    #f57c00 orange darken-2
    #ef6c00 orange darken-3
    #e65100 orange darken-4
    #ffd180 orange accent-1
    #ffab40 orange accent-2
    #ff9100 orange accent-3
    #ff6d00 orange accent-4
*/

@Injectable()
export class HtmlReportService {
    public constructor(
        private readonly fileSystemService: FileSystemService,
        private readonly configService: ConfigService,
    ) {}

    public async createReport(crapReport: CrapReport): Promise<void> {
        const htmlReportDir = this.configService.getHtmlReportDir();
        if (!htmlReportDir) {
            throw new Error("No HTML report directory specified.");
        }

        await this.initHandlebars();
        const prismStyles = await this.fileSystemService.loadSourceFile(
            new URL("./prism/prism.min.css", import.meta.url),
        );
        const prismScript = await this.fileSystemService.loadSourceFile(new URL("./prism/prism.js", import.meta.url));

        const functions: FunctionReport[] = [];
        Object.entries(crapReport).forEach(([filePath, fileReport]) => {
            Object.values(fileReport).forEach((functionReport, fileIndex) => {
                functions.push({ ...functionReport, filePath, fileIndex });
            });
        });
        functions.sort((a, b) => b.statements.crap - a.statements.crap);
        const pageTemplate = await this.fileSystemService.loadHandlebarsTemplate(
            new URL("./template/page.hbs", import.meta.url),
        );
        await Promise.all(
            functions.map(async (functionReport) => {
                const html = pageTemplate({
                    ...functionReport,
                    content: "function",
                    title: `CRAP: ${functionReport.functionDescriptor} - ${functionReport.filePath}`,
                    sourceCode: functionReport.sourceCode,
                    prismStyles,
                    prismScript,
                });

                this.fileSystemService.writeHtmlReport(
                    join(htmlReportDir, functionReport.filePath, `${functionReport.fileIndex}.html`),
                    html,
                );
            }),
        );

        const result = pageTemplate({ functions, content: "overview", title: "CRAP", prismStyles, prismScript });

        await this.fileSystemService.writeHtmlReport(join(htmlReportDir, "index.html"), result, { logLevel: "log" });
    }

    private async initHandlebars(): Promise<void> {
        Handlebars.registerHelper("equals", (a: unknown, b: unknown): boolean => a === b);
        Handlebars.registerHelper("decimal", (x: number): string => x.toFixed(2));
        Handlebars.registerHelper("percentage", (x: number): string => `${(x * 100).toFixed(2)}%`);
        Handlebars.registerHelper("highlightName", (s: string): string => {
            const match = s.match(/^(?<prefix>.*)'(?<name>.*)'(?<suffix>.*)$/);
            if (!match) {
                return s;
            }

            return `${match.groups?.prefix}'<b>${match.groups?.name}</b>${match.groups?.suffix}'`;
        });
        Handlebars.registerHelper(
            "functionReportPath",
            (filePath: string, fileIndex: number): string => `./${filePath}/${fileIndex}.html`,
        );
        Handlebars.registerHelper("functionLineNumber", (report: FunctionReport): string => {
            if (report.end.line != undefined && report.start.line !== report.end.line) {
                return `L${report.start.line} - L${report.end.line}`;
            }
            return `L${report.start.line}`;
        });
        Handlebars.registerHelper("uncoveredLineList", (report: FunctionReport): string =>
            report.uncoveredLines.join(","),
        );
        Handlebars.registerHelper("header", (content: string): string => `${content}_header`);

        Handlebars.registerPartial(
            "overview",
            await this.fileSystemService.loadHandlebarsTemplate(new URL("./template/overview.hbs", import.meta.url)),
        );
        Handlebars.registerPartial(
            "overview_header",
            await this.fileSystemService.loadHandlebarsTemplate(
                new URL("./template/overview_header.hbs", import.meta.url),
            ),
        );
        Handlebars.registerPartial(
            "function",
            await this.fileSystemService.loadHandlebarsTemplate(new URL("./template/function.hbs", import.meta.url)),
        );
        Handlebars.registerPartial(
            "function_header",
            await this.fileSystemService.loadHandlebarsTemplate(
                new URL("./template/function_header.hbs", import.meta.url),
            ),
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
