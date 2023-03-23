import { Injectable, Logger } from "@nestjs/common";
import { mkdir, readFile, writeFile } from "fs/promises";
import Handlebars from "handlebars";
import { CoverageMapData } from "istanbul-lib-coverage";
import { mapValues, omit } from "lodash-es";
import { dirname } from "path";
import { CrapReport, CrapReportJsonObject } from "./crap-report.js";

const { compile } = Handlebars;

export type LoadedFile = "coverage report" | "source file" | "handlebars template";
export type WrittenFile = "JSON report" | "HTML report";

@Injectable()
export class FileSystemService {
    public constructor(private readonly logger: Logger) {}

    /**
     * @throws LoadCoverageError if the file could not be loaded.
     *
     * @see https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md
     */
    public async loadCoverageReport(path: string | URL): Promise<CoverageMapData> {
        const coverageReport = await this.loadFile({ path, type: "coverage report" });
        return JSON.parse(coverageReport);
    }

    // TODO: recover if file not found and continue with other files
    /**
     * @throws LoadFileError if the file could not be loaded.
     */
    public async loadSourceFile(path: string | URL): Promise<string> {
        return await this.loadFile({ path, type: "source file" });
    }

    /**
     * @throws LoadFileError if the file could not be loaded.
     */
    public async loadHandlebarsTemplate(path: string | URL): Promise<Handlebars.TemplateDelegate> {
        const source = await this.loadFile({ path, type: "handlebars template" });
        return compile(source, { preventIndent: true });
    }

    /**
     * @throws LoadFileError if the file could not be loaded.
     */
    private async loadFile({ path, type }: { path: string | URL; type: LoadedFile }): Promise<string> {
        try {
            const data = await readFile(path, "utf-8");
            this.logger.debug(`Loaded ${type} from "${path}".`);
            return data;
        } catch (error) {
            this.logger.error(`Failed to load ${type} from "${path}".`, { error });
            throw new LoadFileError({ path, type });
        }
    }

    public async writeJsonReport(path: string, report: CrapReport): Promise<void> {
        const data: CrapReportJsonObject = mapValues(report, (crapFile) =>
            mapValues(crapFile, (crapFunction) => omit(crapFunction, ["sourceCode"])),
        );

        await this.writeFile({ path, type: "JSON report", data: JSON.stringify(data) });
    }

    public async writeHtmlReport(path: string, report: string): Promise<void> {
        await this.writeFile({ path, type: "HTML report", data: report });
    }

    private async writeFile({ path, type, data }: { path: string; type: WrittenFile; data: string }): Promise<void> {
        try {
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, data);

            this.logger.log(`Wrote ${type} to "${path}".`);
        } catch (error) {
            this.logger.error(`Failed to write ${type} to "${path}".`, { error });
        }
    }
}

export class LoadFileError extends Error {
    public readonly path: string | URL;
    public readonly type: LoadedFile;

    public constructor({ path, type }: { path: string | URL; type: LoadedFile }) {
        super(`Failed to load ${type} from "${path}".`);
        this.path = path;
        this.type = type;
    }
}
