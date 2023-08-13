import { CrapReportTest } from "../crap-report.test.js";

export const classExpressionTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "class-expression.ts",
        istanbulFunctionName: "(anonymous_0)",
        expectedReport: {
            functionDescriptor: "method 'abs'",
            start: {
                line: 2,
                column: 11,
            },
            end: {
                line: 8,
                column: 6,
            },
            complexity: 2,
            statements: {
                covered: 0,
                total: 4,
                coverage: 0,
                crap: 6,
            },
            uncoveredLines: [2, 3, 4, 5, 6, 7, 8],
        },
    },
];
