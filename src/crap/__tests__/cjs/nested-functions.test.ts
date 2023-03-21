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
                        total: 2,
                        coverage: 0,
                        crap: 2,
                    },
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
                        total: 2,
                        coverage: 0,
                        crap: 2,
                    },
                },
            }),
        );
    });
});
