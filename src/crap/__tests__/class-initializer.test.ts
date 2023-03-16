import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("class-field-initializer", () => {
    test(
        "checkIfTest",
        testCrapFunctionReport({
            filePath: "class-initializer.ts",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "Method 'checkIfTest'",
                line: 8,
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
            istanbulFunctionName: "(anonymous_1)",
            expectedReport: {
                functionDescriptor: "Method 'getSupportedLanguages'",
                line: 25,
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
