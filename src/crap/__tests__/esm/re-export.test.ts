import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("re-export", () => {
    test(
        "localAbs",
        testCrapFunctionReport({
            filePath: "re-export.ts",
            project: "esm",
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
