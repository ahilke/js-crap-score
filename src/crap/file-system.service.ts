import { Injectable, Logger } from "@nestjs/common";
import { mkdir, readFile, writeFile } from "fs/promises";
import { CoverageMapData } from "istanbul-lib-coverage";
import { dirname } from "path";
import { CrapReport } from "./crap-report.service.js";

export type LoadedFile = "coverage report" | "source file";

@Injectable()
export class FileSystemService {
    public constructor(private readonly logger: Logger) {}

    /**
     * @throws LoadCoverageError if the file could not be loaded.
     *
     * @see https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md
     */
    public async loadCoverageReport(path: string): Promise<CoverageMapData> {
        const coverageReport = await this.loadFile({ path, type: "coverage report" });
        return JSON.parse(coverageReport);
    }

    // TODO: recover if file not found and continue with other files
    /**
     * @throws LoadCoverageError if the file could not be loaded.
     */
    public async loadSourceFile(path: string): Promise<string> {
        return await this.loadFile({ path, type: "source file" });
    }

    /**
     * @throws LoadCoverageError if the file could not be loaded.
     */
    private async loadFile({ path, type }: { path: string; type: LoadedFile }): Promise<string> {
        const fileUrl = new URL(path, import.meta.url);

        try {
            const data = await readFile(fileUrl, "utf-8");
            this.logger.log(`Loaded ${type} from "${fileUrl}".`);
            return data;
        } catch (error) {
            this.logger.error(`Failed to load ${type} from "${fileUrl}".`, { error });
            throw new LoadCoverageError({ fileUrl, type });
        }
    }

    public async writeCrapReport(path: string, report: CrapReport): Promise<void> {
        try {
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, JSON.stringify(report));

            this.logger.log(`Wrote CRAP score report to "${path}".`);
        } catch (error) {
            this.logger.error(`Failed to write CRAP score report to "${path}".`, { error });
        }
    }

    public async writeHtmlReport(path: string, report: string): Promise<void> {
        try {
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, report);

            this.logger.log(`Wrote HTML report to "${path}".`);
        } catch (error) {
            this.logger.error(`Failed to write HTML report to "${path}".`, { error });
        }
    }
}

export class LoadCoverageError extends Error {
    public readonly fileUrl: URL;
    public readonly type: LoadedFile;

    public constructor({ fileUrl, type }: { fileUrl: URL; type: LoadedFile }) {
        super(`Failed to load ${type} from "${fileUrl}".`);
        this.fileUrl = fileUrl;
        this.type = type;
    }
}
