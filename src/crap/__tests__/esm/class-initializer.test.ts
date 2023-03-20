import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("class-field-initializer", () => {
    test(
        "checkIfTest",
        testCrapFunctionReport({
            filePath: "class-initializer.ts",
            project: "esm",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "method 'checkIfTest'",
                start: {
                    line: 8,
                    column: 27,
                },
                end: {
                    line: 13,
                    column: 6,
                },
                complexity: 2,
                statements: {
                    covered: 0,
                    total: 4,
                    coverage: 0,
                    crap: 6,
                },
            },
        }),
    );

    test(
        "getSupportedLanguages",
        testCrapFunctionReport({
            filePath: "class-initializer.ts",
            project: "esm",
            istanbulFunctionName: "(anonymous_1)",
            expectedReport: {
                functionDescriptor: "method 'getSupportedLanguages'",
                start: {
                    line: 25,
                    column: 34,
                },
                end: {
                    line: 27,
                    column: 6,
                },
                complexity: 1,
                statements: {
                    covered: 0,
                    total: 1,
                    coverage: 0,
                    crap: 2,
                },
            },
        }),
    );
});
