import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("if-else", () => {
    test(
        "uncovered",
        testCrapFunctionReport({
            filePath: "if-else/uncovered.ts",
            istanbulFunctionName: "uncovered",
            expectedReport: {
                functionDescriptor: "function 'uncovered'",
                line: 1,
                complexity: 2,
                statements: {
                    covered: 0,
                    total: 3,
                    coverage: 0,
                    crap: 6,
                },
            },
        }),
    );

    test(
        "ifCovered",
        testCrapFunctionReport({
            filePath: "if-else/if-covered.ts",
            istanbulFunctionName: "ifCovered",
            expectedReport: {
                functionDescriptor: "function 'ifCovered'",
                line: 1,
                complexity: 2,
                statements: {
                    covered: 2,
                    total: 3,
                    coverage: 0.6666666666666666,
                    crap: 2.1481481481481484,
                },
            },
        }),
    );

    test(
        "elseCovered",
        testCrapFunctionReport({
            filePath: "if-else/else-covered.ts",
            istanbulFunctionName: "elseCovered",
            expectedReport: {
                functionDescriptor: "function 'elseCovered'",
                line: 1,
                complexity: 2,
                statements: {
                    covered: 2,
                    total: 3,
                    coverage: 0.6666666666666666,
                    crap: 2.1481481481481484,
                },
            },
        }),
    );

    test(
        "fullyCovered",
        testCrapFunctionReport({
            filePath: "if-else/fully-covered.ts",
            istanbulFunctionName: "fullyCovered",
            expectedReport: {
                functionDescriptor: "function 'fullyCovered'",
                line: 1,
                complexity: 2,
                statements: {
                    covered: 3,
                    total: 3,
                    coverage: 1,
                    crap: 2,
                },
            },
        }),
    );
});
