import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("generic", () => {
    describe("generic", () => {
        test(
            "identity",
            testCrapFunctionReport({
                filePath: "generic.ts",
                project: "esm",
                istanbulFunctionName: "(anonymous_0)",
                expectedReport: {
                    functionDescriptor: "arrow function 'identity'",
                    start: {
                        line: 1,
                        column: 18,
                    },
                    end: {
                        line: 1,
                        column: 39,
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

    describe("generic-with-jsx", () => {
        test(
            "identity",
            testCrapFunctionReport({
                filePath: "generic-with-jsx.tsx",
                project: "esm",
                istanbulFunctionName: "(anonymous_0)",
                expectedReport: {
                    functionDescriptor: "arrow function 'identity'",
                    start: {
                        line: 4,
                        column: 18,
                    },
                    end: {
                        line: 4,
                        column: 40,
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
            "component",
            testCrapFunctionReport({
                filePath: "generic-with-jsx.tsx",
                project: "esm",
                istanbulFunctionName: "(anonymous_1)",
                expectedReport: {
                    functionDescriptor: "arrow function 'component'",
                    start: {
                        line: 6,
                        column: 19,
                    },
                    end: {
                        line: 6,
                        column: 41,
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
