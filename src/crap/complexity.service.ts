import { Injectable, Logger } from "@nestjs/common";
import { ESLint } from "eslint";
import { Location } from "./location-in-range.js";

export interface LintMessage {
    start: Location;
    end: {
        line: number | undefined;
        column: number | undefined;
    };
    complexity: number;
    functionName: string;
}

@Injectable()
export class ComplexityService {
    /**
     * @see https://github.com/eslint/eslint/blob/main/lib/rules/complexity.js - source of the `complexity` rule
     */
    private errorRegex = /(?<name>.*) has a complexity of (?<complexity>\d*)./;

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
            rules: {
                complexity: ["error", { max: 0 }],
            },
        },
    });

    public constructor(private readonly logger: Logger) {}

    /**
     * Gets cyclomatic complexity from ESLint.
     *
     * Note that `lintText` returns an array despite there being only one lint result
     * in order to keep the interfaces between this and the eslint.lintFiles() method similar.
     *
     * @see https://eslint.org/docs/latest/integrate/nodejs-api#-eslintlinttextcode-options
     */
    public async getComplexity({ sourceCode }: { sourceCode: string }): Promise<Array<LintMessage | null>> {
        const [result] = await this.eslint.lintText(sourceCode);

        return result.messages.map((messageData) => {
            const matches = messageData.message.match(this.errorRegex);
            const complexity = matches?.groups?.complexity;
            const functionName = matches?.groups?.name;

            if (!complexity || !functionName) {
                this.logger.error("Could not compute complexity.", { messageData });
                return null;
            }

            return {
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
        });
    }
}
