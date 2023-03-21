import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("re-export", () => {
    test(
        "abs re-export",
        testCrapFunctionReport({
            filePath: "re-export.ts",
            project: "cjs",
            istanbulFunctionName: "(anonymous_6)",
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
            },
        }),
    );

    test(
        "localAbs",
        testCrapFunctionReport({
            filePath: "re-export.ts",
            project: "cjs",
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
            },
        }),
    );

    test(
        "abs multi-line re-export",
        testCrapFunctionReport({
            filePath: "re-export.ts",
            project: "cjs",
            istanbulFunctionName: "(anonymous_8)",
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
            },
        }),
    );
});
