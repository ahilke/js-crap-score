import { describe, expect, test } from "@jest/globals";
import { findFileInCrapReport, getCrapReport } from "./crap-report.js";

describe("anonymous", () => {
    test("classFunction", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/anonymous/class-function.ts");

        expect(crapFile).toBeDefined();
        expect(Object.keys(crapFile!)).toContain("(anonymous_0)");
        expect(crapFile?.["(anonymous_0)"]).toStrictEqual({
            functionDescriptor: "Method 'classFunction'",
            line: 3,
            complexity: 3,
            statements: {
                covered: 3,
                total: 4,
                coverage: 0.75,
                crap: 3.140625,
            },
        });
    });

    test("functionExpression", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/anonymous/function-expression.ts");

        expect(crapFile).toBeDefined();
        expect(Object.keys(crapFile!)).toContain("(anonymous_0)");
        expect(crapFile?.["(anonymous_0)"]).toStrictEqual({
            functionDescriptor: "Arrow function",
            line: 1,
            complexity: 2,
            statements: {
                covered: 1,
                total: 1,
                coverage: 1,
                crap: 2,
            },
        });
    });
});
