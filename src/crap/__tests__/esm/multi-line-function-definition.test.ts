import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "../crap-report.js";

describe("enum", () => {
    test(
        "MyEnum",
        testCrapFunctionReport({
            filePath: "multi-line-function-definition.ts",
            project: "esm",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "arrow function 'multiLineFunctionDefinition'",
                start: {
                    line: 4,
                    column: 44,
                },
                end: {
                    line: 14,
                    column: 2,
                },
                complexity: 1,
                statements: {
                    covered: 0,
                    total: 2,
                    coverage: 0,
                    crap: 2,
                },
            },
        }),
    );
});
