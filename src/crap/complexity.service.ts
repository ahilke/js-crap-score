import { Injectable, Logger } from "@nestjs/common";
import { ESLint } from "eslint";
import { ConfigService } from "./config.service.js";
import { FileSystemService } from "./file-system.service.js";
import { Location } from "./location-in-range.js";

export interface FunctionComplexity {
    start: Location;
    end: {
        line: number | undefined;
        column: number | undefined;
    };
    complexity: number;
    functionName: string;
    sourceCode?: string;
}

@Injectable()
export class ComplexityService {
    /**
     * @see https://github.com/eslint/eslint/blob/main/lib/rules/complexity.js - source of the `complexity` rule
     */
    private complexityRegex = /(?<name>.*) has a complexity of (?<complexity>\d*)\./;
    private enumRegex = /TypeScript Enum (?<name>.*)\./;

    private eslint = new ESLint({
        useEslintrc: false,
        /*
         * Disable ESLint comments. This solves multiple problems:
         *  1. A disable comment on an unknown rule would cause an error, see https://stackoverflow.com/a/64650648/10380981.
         *  2. A disable comment on the `complexity` rule would prevent us from detecting the complexity.
         */
        allowInlineConfig: false,
        overrideConfig: {
            parser: "@typescript-eslint/parser",
            plugins: ["crap"],
            rules: {
                "crap/complexity": "error",
            },
        },
    });

    public constructor(
        private readonly fileSystemService: FileSystemService,
        private readonly configService: ConfigService,
        private readonly logger: Logger,
    ) {}

    /**
     * Gets cyclomatic complexity from ESLint.
     *
     * Note that `lintText` returns an array despite there being only one lint result
     * in order to keep the interfaces between this and the eslint.lintFiles() method similar.
     *
     * @see https://eslint.org/docs/latest/integrate/nodejs-api#-eslintlinttextcode-options
     */
    public async getComplexity({ sourcePath }: { sourcePath: string }): Promise<Array<FunctionComplexity | null>> {
        const { htmlReportDir } = this.configService.config;

        const source = await this.fileSystemService.loadSourceFile(sourcePath);
        const lines = source.split("\n");
        const [result] = await this.eslint.lintText(source);

        return result.messages.map((messageData) => {
            let complexity: string | undefined;
            let functionName: string | undefined;
            if (messageData.messageId === "enum") {
                const matches = messageData.message.match(this.enumRegex);
                complexity = "1";
                functionName = matches?.groups?.name;
            } else if (messageData.messageId === "complex") {
                const matches = messageData.message.match(this.complexityRegex);
                complexity = matches?.groups?.complexity;
                functionName = matches?.groups?.name;
            } else {
                this.logger.error("Unknown message ID.", { messageData, path: sourcePath });
                return null;
            }

            if (!complexity || !functionName) {
                this.logger.error("Could not compute complexity.", { messageData, path: sourcePath });
                return null;
            }

            const result: FunctionComplexity = {
                start: {
                    line: messageData.line,
                    column: messageData.column,
                },
                end: {
                    line: messageData.endLine,
                    column: messageData.endColumn,
                },
                complexity: parseInt(complexity, 10),
                functionName,
            };

            if (htmlReportDir) {
                result.sourceCode = lines.slice(messageData.line - 1, messageData.endLine).join("\n");
            }

            return result;
        });
    }
}
