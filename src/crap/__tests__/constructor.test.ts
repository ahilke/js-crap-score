import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("constructor", () => {
    test(
        "MyClass constructor",
        testCrapFunctionReport({
            filePath: "constructor.ts",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "Constructor",
                line: 4,
                complexity: 2,
                statements: {
                    covered: 2,
                    total: 3,
                    coverage: 0.6666666666666666,
                    crap: 2.1481481481481484,
                },
            },
        }),
    );
});
