import { CrapReportTest } from "../crap-report.test.js";

export const ifElseTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "if-else/uncovered.ts",
        istanbulFunctionName: "uncovered",
        expectedReport: {
            functionDescriptor: "function 'uncovered'",
            start: {
                line: 1,
                column: 8,
            },
            end: {
                line: 7,
                column: 2,
            },
            complexity: 2,
            statements: {
                covered: 0,
                total: 3,
                coverage: 0,
                crap: 6,
            },
            uncoveredLines: [2, 3, 4, 5, 6],
        },
    },
    {
        project: "esm",
        filePath: "if-else/if-covered.ts",
        istanbulFunctionName: "ifCovered",
        expectedReport: {
            functionDescriptor: "function 'ifCovered'",
            start: {
                line: 1,
                column: 8,
            },
            end: {
                line: 7,
                column: 2,
            },
            complexity: 2,
            statements: {
                covered: 2,
                total: 3,
                coverage: 0.6666666666666666,
                crap: 2.1481481481481484,
            },
            uncoveredLines: [5],
        },
    },
    {
        project: "esm",
        filePath: "if-else/else-covered.ts",
        istanbulFunctionName: "elseCovered",
        expectedReport: {
            functionDescriptor: "function 'elseCovered'",
            start: {
                line: 1,
                column: 8,
            },
            end: {
                line: 7,
                column: 2,
            },
            complexity: 2,
            statements: {
                covered: 2,
                total: 3,
                coverage: 0.6666666666666666,
                crap: 2.1481481481481484,
            },
            uncoveredLines: [3],
        },
    },
    {
        project: "esm",
        filePath: "if-else/fully-covered.ts",
        istanbulFunctionName: "fullyCovered",
        expectedReport: {
            functionDescriptor: "function 'fullyCovered'",
            start: {
                line: 1,
                column: 8,
            },
            end: {
                line: 7,
                column: 2,
            },
            complexity: 2,
            statements: {
                covered: 3,
                total: 3,
                coverage: 1,
                crap: 2,
            },
            uncoveredLines: [],
        },
    },
];
