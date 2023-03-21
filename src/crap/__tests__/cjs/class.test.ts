import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("class", () => {
    describe("MyClass", () => {
        test(
            "class",
            testCrapFunctionReport({
                filePath: "class.ts",
                project: "cjs",
                istanbulFunctionName: "(anonymous_0)",
                expectedReport: {
                    functionDescriptor: "class 'MyClass'",
                    start: {
                        line: 6,
                        column: 1,
                    },
                    end: {
                        line: 14,
                        column: 2,
                    },
                    complexity: 1,
                    statements: {
                        covered: 3,
                        total: 4,
                        coverage: 0.75,
                        crap: 1.015625,
                    },
                },
            }),
        );

        test(
            "abs",
            testCrapFunctionReport({
                filePath: "class.ts",
                project: "cjs",
                istanbulFunctionName: "(anonymous_1)",
                expectedReport: {
                    functionDescriptor: "method 'abs'",
                    start: {
                        line: 7,
                        column: 11,
                    },
                    end: {
                        line: 13,
                        column: 6,
                    },
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
    });

    describe("ClassExpression", () => {
        test(
            "class",
            testCrapFunctionReport({
                filePath: "class.ts",
                project: "cjs",
                istanbulFunctionName: "(anonymous_2)",
                expectedReport: {
                    functionDescriptor: "class 'anonymous'",
                    start: {
                        line: 16,
                        column: 25,
                    },
                    end: {
                        line: 24,
                        column: 2,
                    },
                    complexity: 1,
                    statements: {
                        covered: 1,
                        total: 5,
                        coverage: 0.2,
                        crap: 1.512,
                    },
                },
            }),
        );

        test(
            "abs",
            testCrapFunctionReport({
                filePath: "class.ts",
                project: "cjs",
                istanbulFunctionName: "(anonymous_3)",
                expectedReport: {
                    functionDescriptor: "method 'abs'",
                    start: {
                        line: 17,
                        column: 11,
                    },
                    end: {
                        line: 23,
                        column: 6,
                    },
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
    });
});
