import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("eslint-comments", () => {
    test(
        "tooComplex",
        testCrapFunctionReport({
            filePath: "eslint-comments.ts",
            istanbulFunctionName: "tooComplex",
            expectedReport: {
                functionDescriptor: "Function 'tooComplex'",
                line: 2,
                complexity: 7,
                statements: {
                    covered: 0,
                    total: 11,
                    coverage: 0,
                    crap: 56,
                },
            },
        }),
    );
});
