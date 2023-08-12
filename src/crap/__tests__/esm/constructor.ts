import { CrapReportTest } from "../crap-report.test.js";

export const constructorTestCases: CrapReportTest[] = [
    {
        project: "esm",
        filePath: "constructor.ts",
        istanbulFunctionName: "(anonymous_0)",
        expectedReport: {
            functionDescriptor: "constructor",
            start: {
                line: 4,
                column: 23,
            },
            end: {
                line: 10,
                column: 6,
            },
            complexity: 2,
            statements: {
                covered: 2,
                total: 3,
                coverage: 0.6666666666666666,
                crap: 2.1481481481481484,
            },
            uncoveredLines: [8],
        },
    },
];
