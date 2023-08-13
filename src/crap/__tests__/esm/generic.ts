import { CrapReportTest } from "../crap-report.test.js";

export const genericTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "generic.ts",
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
            uncoveredLines: [1],
        },
    },
    {
        project: "esm",
        filePath: "generic-with-jsx.tsx",
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
            uncoveredLines: [4],
        },
    },
    {
        project: "esm",
        filePath: "generic-with-jsx.tsx",
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
            uncoveredLines: [6],
        },
    },
];
