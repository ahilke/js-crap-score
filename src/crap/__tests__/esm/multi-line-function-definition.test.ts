import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("multi-line-function-definition", () => {
    test(
        "multiLineFunctionDefinition",
        testCrapFunctionReport({
            filePath: "multi-line-function-definition.ts",
            project: "esm",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "arrow function 'multiLineFunctionDefinition'",
                start: {
                    line: 4,
                    column: 44,
                },
                end: {
                    line: 14,
                    column: 2,
                },
                complexity: 1,
                statements: {
                    covered: 0,
                    total: 2,
                    coverage: 0,
                    crap: 2,
                },
                uncoveredLines: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            },
        }),
    );
});
