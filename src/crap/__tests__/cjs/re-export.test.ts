import { CrapReportTest } from "../crap-report.test.js";

export const reExportTestCases: CrapReportTest[] = [
    {
        project: "cjs",
        filePath: "re-export.ts",
        istanbulFunctionName: "(anonymous_0)",
        expectedReport: {
            functionDescriptor: "export",
            start: {
                line: 4,
                column: 1,
            },
            end: {
                line: 4,
                column: 57,
            },
            complexity: 1,
            statements: {
                covered: 2,
                total: 2,
                coverage: 1,
                crap: 1,
            },
            uncoveredLines: [],
        },
    },
    {
        project: "cjs",
        filePath: "re-export.ts",
        istanbulFunctionName: "localAbs",
        expectedReport: {
            functionDescriptor: "function 'localAbs'",
            start: {
                line: 7,
                column: 8,
            },
            end: {
                line: 13,
                column: 2,
            },
            complexity: 2,
            statements: {
                covered: 3,
                total: 4,
                coverage: 0.75,
                crap: 2.0625,
            },
            uncoveredLines: [11],
        },
    },
    {
        project: "cjs",
        filePath: "re-export.ts",
        istanbulFunctionName: "(anonymous_2)",
        expectedReport: {
            functionDescriptor: "export",
            start: {
                line: 26,
                column: 1,
            },
            end: {
                line: 29,
                column: 3,
            },
            complexity: 1,
            statements: {
                covered: 1,
                total: 1,
                coverage: 1,
                crap: 1,
            },
            uncoveredLines: [],
        },
    },
];
