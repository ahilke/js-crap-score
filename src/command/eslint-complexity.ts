import { ESLint } from "eslint";

/**
 * @see https://github.com/eslint/eslint/blob/main/lib/rules/complexity.js - source of the `complexity` rule
 */
const errorRegex = /(?<name>.*) has a complexity of (?<complexity>\d*)./;

const eslint = new ESLint({
    useEslintrc: false,
    overrideConfig: {
        parser: "@typescript-eslint/parser",
        rules: {
            complexity: ["error", { max: 0 }],
        },
    },
});

/**
 * Gets cyclomatic complexity from ESLint.
 *
 * Note that `lintText` returns an array despite there being only one lint result
 * in order to keep the interfaces between this and the eslint.lintFiles() method similar.
 *
 * @see https://eslint.org/docs/latest/integrate/nodejs-api#-eslintlinttextcode-options
 */
export async function getComplexity({ sourceCode }: { sourceCode: string }) {
    const [result] = await eslint.lintText(sourceCode);

    return result.messages.map((messageData) => {
        const matches = messageData.message.match(errorRegex);
        // TODO: log error if undefined
        const complexity = matches?.groups?.complexity;
        const functionName = matches?.groups?.name;

        return {
            ...messageData,
            complexity: complexity ? parseInt(complexity, 10) : undefined,
            functionName,
        };
    });
}
