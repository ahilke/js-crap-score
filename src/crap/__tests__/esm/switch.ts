import { CrapReportTest } from "../crap-report.test.js";

export const switchTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "switch.ts",
        istanbulFunctionName: "switchCase",
        expectedReport: {
            functionDescriptor: "function 'switchCase'",
            start: {
                line: 1,
                column: 8,
            },
            end: {
                line: 10,
                column: 2,
            },
            complexity: 3,
            statements: {
                covered: 3,
                total: 4,
                coverage: 0.75,
                crap: 3.140625,
            },
            uncoveredLines: [6],
        },
    },
];
