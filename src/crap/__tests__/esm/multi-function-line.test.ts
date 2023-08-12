import { CrapReportTest } from "../crap-report.test.js";

export const multiFunctionLineTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "multi-function-line.ts",
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
            uncoveredLines: [3],
        },
    },
    {
        project: "esm",
        filePath: "multi-function-line.ts",
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
            uncoveredLines: [3],
        },
    },
    {
        project: "esm",
        filePath: "multi-function-line.ts",
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
            uncoveredLines: [3],
        },
    },
];
