import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("re-export", () => {
    test(
        "localAbs",
        testCrapFunctionReport({
            filePath: "re-export.ts",
            project: "cjs",
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
                    covered: 3,
                    total: 4,
                    coverage: 0.75,
                    crap: 2.0625,
                },
            },
        }),
    );
});
