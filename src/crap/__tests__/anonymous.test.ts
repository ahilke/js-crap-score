import { describe, test } from "@jest/globals";
import { testCrapFunctionReport } from "./crap-report.js";

describe("anonymous", () => {
    test(
        "classFunction",
        testCrapFunctionReport({
            filePath: "anonymous/class-function.ts",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "Method 'classFunction'",
                line: 3,
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

    test(
        "functionExpression",
        testCrapFunctionReport({
            filePath: "anonymous/function-expression.ts",
            istanbulFunctionName: "(anonymous_0)",
            expectedReport: {
                functionDescriptor: "Arrow function 'functionExpression'",
                line: 1,
                complexity: 2,
                statements: {
                    covered: 2,
                    total: 2,
                    coverage: 1,
                    crap: 2,
                },
            },
        }),
    );
});
