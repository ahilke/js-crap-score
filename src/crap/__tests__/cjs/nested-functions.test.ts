import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("nested-functions", () => {
    describe("getFunction", () => {
        test(
            "outer function",
            testCrapFunctionReport({
                filePath: "nested-functions.ts",
                project: "cjs",
                istanbulFunctionName: "getFunction",
                expectedReport: {
                    functionDescriptor: "function 'getFunction'",
                    start: {
                        line: 1,
                        column: 8,
                    },
                    end: {
                        line: 11,
                        column: 2,
                    },
                    complexity: 2,
                    statements: {
                        covered: 0,
                        total: 7,
                        coverage: 0,
                        crap: 6,
                    },
                    uncoveredLines: [1, 4, 5, 6, 7, 8, 10],
                },
            }),
        );

        test(
            "inner function 'id'",
            testCrapFunctionReport({
                filePath: "nested-functions.ts",
                project: "cjs",
                istanbulFunctionName: "(anonymous_1)",
                expectedReport: {
                    functionDescriptor: "arrow function 'result'",
                    start: {
                        line: 5,
                        column: 18,
                    },
                    end: {
                        line: 5,
                        column: 34,
                    },
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 1,
                        coverage: 0,
                        crap: 2,
                    },
                    uncoveredLines: [5],
                },
            }),
        );

        test(
            "inner function 'inverse'",
            testCrapFunctionReport({
                filePath: "nested-functions.ts",
                project: "cjs",
                istanbulFunctionName: "(anonymous_2)",
                expectedReport: {
                    functionDescriptor: "arrow function 'result'",
                    start: {
                        line: 7,
                        column: 18,
                    },
                    end: {
                        line: 7,
                        column: 35,
                    },
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 1,
                        coverage: 0,
                        crap: 2,
                    },
                    uncoveredLines: [7],
                },
            }),
        );
    });
});
