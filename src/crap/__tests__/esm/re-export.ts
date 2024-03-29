import { CrapReportTest } from "../crap-report.test.js";

export const reExportTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "re-export.ts",
        istanbulFunctionName: "localAbs",
        expectedReport: {
            functionDescriptor: "function 'localAbs'",
            start: {
                line: 3,
                column: 8,
            },
            end: {
                line: 9,
                column: 2,
            },
            complexity: 2,
            statements: {
                covered: 2,
                total: 3,
                coverage: 0.6666666666666666,
                crap: 2.1481481481481484,
            },
            uncoveredLines: [7],
        },
    },
];
