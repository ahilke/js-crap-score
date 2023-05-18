import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("if-else", () => {
    test(
        "ifCovered",
        testCrapFunctionReport({
            filePath: "if-else/if-covered.ts",
            project: "cjs",
            istanbulFunctionName: "ifCovered",
            expectedReport: {
                functionDescriptor: "function 'ifCovered'",
                start: {
                    line: 1,
                    column: 8,
                },
                end: {
                    line: 7,
                    column: 2,
                },
                complexity: 2,
                statements: {
                    covered: 3,
                    total: 4,
                    coverage: 0.75,
                    crap: 2.0625,
                },
                uncoveredLines: [5],
            },
        }),
    );
});
