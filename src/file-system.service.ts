import { Injectable, Logger } from "@nestjs/common";
import { CoverageMapData } from "istanbul-lib-coverage";
import { readFileSync } from "fs";

@Injectable()
export class FileSystemService {
    public constructor(private readonly logger: Logger) {}

    /**
     * @see https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md
     */
    public loadCoverageReport(relativePath: string): CoverageMapData {
        const fileUrl = new URL(relativePath, import.meta.url);
        this.logger.debug(`Loading coverage from "${fileUrl}".`);

        return JSON.parse(readFileSync(fileUrl, "utf-8"));
    }

    public loadSourceFile(absolutePath: string): string {
        const fileUrl = new URL(`file://${absolutePath}`);

        this.logger.debug(`Loading source file from "${fileUrl}".`);
        return readFileSync(fileUrl, "utf-8");
    }
}
