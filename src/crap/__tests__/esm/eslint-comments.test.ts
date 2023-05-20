import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("eslint-comments", () => {
    test(
        "tooComplex",
        testCrapFunctionReport({
            filePath: "eslint-comments.ts",
            project: "esm",
            istanbulFunctionName: "tooComplex",
            expectedReport: {
                functionDescriptor: "function 'tooComplex'",
                start: {
                    line: 2,
                    column: 1,
                },
                end: {
                    line: 24,
                    column: 2,
                },
                complexity: 7,
                statements: {
                    covered: 0,
                    total: 11,
                    coverage: 0,
                    crap: 56,
                },
                uncoveredLines: [3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
            },
        }),
    );
});
