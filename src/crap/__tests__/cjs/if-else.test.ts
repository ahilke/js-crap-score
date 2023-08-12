import { CrapReportTest } from "../crap-report.test.js";

export const ifElseTestCases: CrapReportTest[] = [
    {
        project: "cjs",
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
                covered: 3,
                total: 4,
                coverage: 0.75,
                crap: 2.0625,
            },
            uncoveredLines: [5],
        },
    },
];
