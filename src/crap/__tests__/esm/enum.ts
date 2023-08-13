import { CrapReportTest } from "../crap-report.test.js";

export const enumTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "enum.ts",
        istanbulFunctionName: "(anonymous_0)",
        expectedReport: {
            functionDescriptor: "enum 'MyEnum'",
            start: {
                line: 2,
                column: 8,
            },
            end: {
                line: 6,
                column: 2,
            },
            complexity: 1,
            statements: {
                covered: 4,
                total: 4,
                coverage: 1,
                crap: 1,
            },
            uncoveredLines: [],
        },
    },
    {
        project: "esm",
        filePath: "enum.ts",
        istanbulFunctionName: "reverseEnum",
        expectedReport: {
            functionDescriptor: "function 'reverseEnum'",
            start: {
                line: 8,
                column: 8,
            },
            end: {
                line: 17,
                column: 2,
            },
            complexity: 4,
            statements: {
                covered: 2,
                total: 4,
                coverage: 0.5,
                crap: 6,
            },
            uncoveredLines: [11, 15],
        },
    },
];
