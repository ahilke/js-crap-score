import { describe, expect, test } from "@jest/globals";
import { findFileInCrapReport, getCrapReport } from "./crap-report.js";

describe("switch", () => {
    test("switchCase", async () => {
        const crapReport = await getCrapReport();
        const crapFile = findFileInCrapReport(crapReport, "test-data/switch.ts");

        expect(crapFile?.switchCase).toBeDefined();
        expect(crapFile?.switchCase.complexity).toBe(1);
        expect(crapFile?.switchCase.statements).toEqual({
            covered: 3,
            total: 4,
            coverage: 0.75,
            crap: 1.015625,
        });
    });
});
