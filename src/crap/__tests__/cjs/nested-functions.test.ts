import { CrapReportTest } from "../crap-report.test.js";

export const nestedFunctionsTestCases: CrapReportTest[] = [
    {
        project: "cjs",
        filePath: "nested-functions.ts",
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
    },
    {
        project: "cjs",
        filePath: "nested-functions.ts",
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
    },
    {
        project: "cjs",
        filePath: "nested-functions.ts",
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
    },
];
