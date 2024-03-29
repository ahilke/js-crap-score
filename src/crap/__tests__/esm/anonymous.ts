import { CrapReportTest } from "../crap-report.test.js";

export const anonymousTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "anonymous/class-function.ts",
        istanbulFunctionName: "(anonymous_0)",
        expectedReport: {
            functionDescriptor: "method 'classFunction'",
            start: {
                line: 3,
                column: 18,
            },
            end: {
                line: 11,
                column: 6,
            },
            complexity: 3,
            statements: {
                covered: 3,
                total: 4,
                coverage: 0.75,
                crap: 3.140625,
            },
            uncoveredLines: [8],
        },
    },
    {
        project: "esm",
        filePath: "anonymous/function-expression.ts",
        istanbulFunctionName: "(anonymous_0)",
        expectedReport: {
            functionDescriptor: "arrow function 'functionExpression'",
            start: {
                line: 1,
                column: 35,
            },
            end: {
                line: 1,
                column: 74,
            },
            complexity: 2,
            statements: {
                covered: 2,
                total: 2,
                coverage: 1,
                crap: 2,
            },
            uncoveredLines: [],
        },
    },
];
