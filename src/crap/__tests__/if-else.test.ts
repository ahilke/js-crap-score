import { describe, expect, test } from "@jest/globals";
import { findFileInCrapReport, getCrapReport } from "./crap-report.js";

describe("if-else", () => {
    test("uncovered", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/if-else/uncovered.ts");

        expect(crapFile?.uncovered).toBeDefined();
        expect(crapFile?.uncovered.complexity).toBe(2);
        expect(crapFile?.uncovered.statements).toEqual({
            covered: 0,
            total: 3,
            coverage: 0,
            crap: 6,
        });
    });

    test.each([["ifCovered"], ["elseCovered"]])("%s", async (functionName) => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, `test-data/if-else/${functionName}.ts`);

        expect(crapFile?.[functionName]).toBeDefined();
        expect(crapFile?.[functionName].complexity).toBe(2);
        expect(crapFile?.[functionName].statements).toEqual({
            covered: 2,
            total: 3,
            coverage: 0.6666666666666666,
            crap: 2.1481481481481484,
        });
    });

    test("fullyCovered", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/if-else/fullyCovered.ts");

        expect(crapFile?.fullyCovered).toBeDefined();
        expect(crapFile?.fullyCovered.complexity).toBe(2);
        expect(crapFile?.fullyCovered.statements).toEqual({
            covered: 3,
            total: 3,
            coverage: 1,
            crap: 2,
        });
    });
});
