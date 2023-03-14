import { describe, expect, test } from "@jest/globals";
import { findFileInCrapReport, getCrapReport } from "./crap-report.js";

describe("anonymous", () => {
    test("classFunction", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/anonymous/class-function.ts");

        expect(crapFile?.classFunction).toBeDefined();
        expect(crapFile?.classFunction.complexity).toBe(2);
        expect(crapFile?.classFunction.statements).toEqual({
            covered: 3,
            total: 4,
            coverage: 0.75,
            crap: 1.015625,
        });
    });

    test("functionExpression", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/anonymous/function-expression.ts");

        expect(crapFile?.functionExpression).toBeDefined();
        expect(crapFile?.functionExpression.complexity).toBe(1);
        expect(crapFile?.functionExpression.statements).toEqual({
            covered: 3,
            total: 3,
            coverage: 1,
            crap: 1,
        });
    });
});
