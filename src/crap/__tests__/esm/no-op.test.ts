import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("no-op", () => {
    describe("class", () => {
        test(
            "NoOpClass constructor",
            testCrapFunctionReport({
                filePath: "no-op/class.ts",
                project: "esm",
                istanbulFunctionName: "(anonymous_0)",
                expectedReport: {
                    functionDescriptor: "constructor",
                    start: {
                        line: 2,
                        column: 23,
                    },
                    end: {
                        line: 2,
                        column: 54,
                    },
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 1,
                        coverage: 0,
                        crap: 2,
                    },
                    uncoveredLines: [2],
                },
            }),
        );

        test(
            "noOp instance method",
            testCrapFunctionReport({
                filePath: "no-op/class.ts",
                project: "esm",
                istanbulFunctionName: "(anonymous_1)",
                expectedReport: {
                    functionDescriptor: "method 'noOp'",
                    start: {
                        line: 4,
                        column: 16,
                    },
                    end: {
                        line: 4,
                        column: 21,
                    },
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 0,
                        coverage: 1,
                        crap: 1,
                    },
                    uncoveredLines: [],
                },
            }),
        );

        test(
            "noOp class method",
            testCrapFunctionReport({
                filePath: "no-op/class.ts",
                project: "esm",
                istanbulFunctionName: "(anonymous_2)",
                expectedReport: {
                    functionDescriptor: "static method 'noOp'",
                    start: {
                        line: 6,
                        column: 23,
                    },
                    end: {
                        line: 6,
                        column: 28,
                    },
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 0,
                        coverage: 1,
                        crap: 1,
                    },
                    uncoveredLines: [],
                },
            }),
        );
    });

    test(
        "function-expression",
        testCrapFunctionReport({
            filePath: "no-op/function-expression.ts",
            project: "esm",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "arrow function 'noOp'",
                start: {
                    line: 1,
                    column: 21,
                },
                end: {
                    line: 1,
                    column: 29,
                },
                complexity: 1,
                statements: {
                    covered: 0,
                    total: 1,
                    coverage: 0,
                    crap: 2,
                },
                uncoveredLines: [1],
            },
        }),
    );

    test(
        "function",
        testCrapFunctionReport({
            filePath: "no-op/function.ts",
            project: "esm",
            istanbulFunctionName: "noOp",
            expectedReport: {
                functionDescriptor: "function 'noOp'",
                start: {
                    line: 1,
                    column: 8,
                },
                end: {
                    line: 1,
                    column: 26,
                },
                complexity: 1,
                statements: {
                    covered: 0,
                    total: 0,
                    coverage: 1,
                    crap: 1,
                },
                uncoveredLines: [],
            },
        }),
    );
});
