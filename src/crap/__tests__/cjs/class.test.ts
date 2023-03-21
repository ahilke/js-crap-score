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
                    functionDescriptor: "method 'abs'",
                    start: {
                        line: 5,
                        column: 11,
                    },
                    end: {
                        line: 11,
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

        test(
            "abs",
            testCrapFunctionReport({
                filePath: "class.ts",
                project: "cjs",
                istanbulFunctionName: "(anonymous_1)",
                expectedReport: {
                    functionDescriptor: "method 'abs'",
                    start: {
                        line: 5,
                        column: 11,
                    },
                    end: {
                        line: 11,
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
});
