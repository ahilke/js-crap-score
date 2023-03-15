import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("class-field-initializer", () => {
    test(
        "getSupportedLanguages",
        testCrapFunctionReport({
            filePath: "class-initializer.ts",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "Method 'getSupportedLanguages'",
                line: 18,
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
