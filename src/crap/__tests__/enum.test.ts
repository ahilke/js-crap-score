import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("enum", () => {
    test(
        "MyEnum",
        testCrapFunctionReport({
            filePath: "enum.ts",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "Enum 'MyEnum'",
                line: 2,
                complexity: 1,
                statements: {
                    covered: 4,
                    total: 4,
                    coverage: 1,
                    crap: 1,
                },
            },
        }),
    );

    test(
        "reverseEnum",
        testCrapFunctionReport({
            filePath: "enum.ts",
            istanbulFunctionName: "reverseEnum",
            expectedReport: {
                functionDescriptor: "Function 'reverseEnum'",
                line: 8,
                complexity: 4,
                statements: {
                    covered: 2,
                    total: 4,
                    coverage: 0.5,
                    crap: 6,
                },
            },
        }),
    );
});
