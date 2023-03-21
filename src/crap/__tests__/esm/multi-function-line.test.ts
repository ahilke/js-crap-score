import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("multi-function-line", () => {
    describe("evenCubes", () => {
        test(
            "evenCubes",
            testCrapFunctionReport({
                filePath: "multi-function-line.ts",
                project: "esm",
                istanbulFunctionName: "evenCubes",
                expectedReport: {
                    functionDescriptor: "function 'evenCubes'",
                    start: {
                        line: 1,
                        column: 8,
                    },
                    end: {
                        line: 4,
                        column: 2,
                    },
                    complexity: 1,
                    statements: {
                        covered: 0,
                        total: 3,
                        coverage: 0,
                        crap: 2,
                    },
                },
            }),
        );

        test(
            "map function",
            testCrapFunctionReport({
                filePath: "multi-function-line.ts",
                project: "esm",
                istanbulFunctionName: "(anonymous_1)",
                expectedReport: {
                    functionDescriptor: "arrow function",
                    start: {
                        line: 3,
                        column: 21,
                    },
                    end: {
                        line: 3,
                        column: 34,
                    },
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
            "filter function",
            testCrapFunctionReport({
                filePath: "multi-function-line.ts",
                project: "esm",
                istanbulFunctionName: "(anonymous_2)",
                expectedReport: {
                    functionDescriptor: "arrow function",
                    start: {
                        line: 3,
                        column: 43,
                    },
                    end: {
                        line: 3,
                        column: 61,
                    },
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
});
