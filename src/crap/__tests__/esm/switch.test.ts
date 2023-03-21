import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("switch", () => {
    test(
        "switchCase",
        testCrapFunctionReport({
            filePath: "switch.ts",
            project: "esm",
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
            },
        }),
    );
});
