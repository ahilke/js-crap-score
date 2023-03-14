import { describe, expect, test } from "@jest/globals";
import { findFileInCrapReport, getCrapReport } from "./crap-report.js";

describe("if-else", () => {
    test("uncovered", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/if-else/uncovered.ts");

        expect(crapFile?.uncovered).toBeDefined();
        expect(crapFile?.uncovered.complexity).toBe(1);
        expect(crapFile?.uncovered.statements).toEqual({
            covered: 0,
            total: 3,
            coverage: 0,
            crap: 2,
        });
    });

    test.each([
        ["ifCovered", "if-covered"],
        ["elseCovered", "else-covered"],
    ])("%s", async (functionName, fileName) => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, `test-data/if-else/${fileName}.ts`);

        expect(crapFile?.[functionName]).toBeDefined();
        expect(crapFile?.[functionName].complexity).toBe(1);
        expect(crapFile?.[functionName].statements).toEqual({
            covered: 2,
            total: 3,
            coverage: 0.6666666666666666,
            crap: 1.037037037037037,
        });
    });

    test("fullyCovered", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/if-else/fully-covered.ts");

        expect(crapFile?.fullyCovered).toBeDefined();
        expect(crapFile?.fullyCovered.complexity).toBe(1);
        expect(crapFile?.fullyCovered.statements).toEqual({
            covered: 3,
            total: 3,
            coverage: 1,
            crap: 1,
        });
    });
});
