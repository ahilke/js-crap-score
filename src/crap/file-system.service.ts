import { Injectable, Logger } from "@nestjs/common";
import { readFileSync } from "fs";
import { CoverageMapData } from "istanbul-lib-coverage";

@Injectable()
export class FileSystemService {
    public constructor(private readonly logger: Logger) {}

    /**
     * @see https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md
     */
    public loadCoverageReport(path: string): CoverageMapData {
        const fileUrl = new URL(path, import.meta.url);

        this.logger.debug(`Loading coverage from "${fileUrl}".`);
        return JSON.parse(readFileSync(fileUrl, "utf-8"));
    }

    // TODO: recover if file not found and continue with other files
    public loadSourceFile(path: string): string {
        const fileUrl = new URL(path, import.meta.url);

        this.logger.debug(`Loading source file from "${fileUrl}".`);
        return readFileSync(fileUrl, "utf-8");
    }
}
