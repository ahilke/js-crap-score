import { CrapReportTest } from "../crap-report.test.js";

export const classInitializerTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "class-initializer.ts",
        istanbulFunctionName: "(anonymous_0)",
        expectedReport: {
            functionDescriptor: "method 'checkIfTest'",
            start: {
                line: 8,
                column: 27,
            },
            end: {
                line: 13,
                column: 6,
            },
            complexity: 2,
            statements: {
                covered: 0,
                total: 4,
                coverage: 0,
                crap: 6,
            },
            uncoveredLines: [8, 9, 10, 11, 12, 13],
        },
    },
    {
        project: "esm",
        filePath: "class-initializer.ts",
        istanbulFunctionName: "(anonymous_1)",
        expectedReport: {
            functionDescriptor: "method 'getSupportedLanguages'",
            start: {
                line: 25,
                column: 34,
            },
            end: {
                line: 27,
                column: 6,
            },
            complexity: 1,
            statements: {
                covered: 0,
                total: 1,
                coverage: 0,
                crap: 2,
            },
            uncoveredLines: [26],
        },
    },
];
