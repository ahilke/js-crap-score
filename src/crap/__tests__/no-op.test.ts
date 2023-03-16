import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("no-op", () => {
    describe("class", () => {
        test(
            "NoOpClass constructor",
            testCrapFunctionReport({
                filePath: "no-op/class.ts",
                istanbulFunctionName: "(anonymous_0)",
                expectedReport: {
                    functionDescriptor: "Constructor",
                    line: 2,
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

        test(
            "noOp instance method",
            testCrapFunctionReport({
                filePath: "no-op/class.ts",
                istanbulFunctionName: "(anonymous_1)",
                expectedReport: {
                    functionDescriptor: "Method 'noOp'",
                    line: 4,
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 0,
                        coverage: 1,
                        crap: 1,
                    },
                },
            }),
        );

        test(
            "noOp class method",
            testCrapFunctionReport({
                filePath: "no-op/class.ts",
                istanbulFunctionName: "(anonymous_2)",
                expectedReport: {
                    functionDescriptor: "Static method 'noOp'",
                    line: 6,
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 0,
                        coverage: 1,
                        crap: 1,
                    },
                },
            }),
        );
    });

    test(
        "function-expression",
        testCrapFunctionReport({
            filePath: "no-op/function-expression.ts",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "Arrow function",
                line: 1,
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

    test(
        "function",
        testCrapFunctionReport({
            filePath: "no-op/function.ts",
            istanbulFunctionName: "noOp",
            expectedReport: {
                functionDescriptor: "Function 'noOp'",
                line: 1,
                complexity: 1,
                statements: {
                    covered: 0,
                    total: 0,
                    coverage: 1,
                    crap: 1,
                },
            },
        }),
    );
});
