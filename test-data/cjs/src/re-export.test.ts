import { describe, expect, test } from "@jest/globals";
import { abs, localAbs } from "./re-export";

describe("re-export", () => {
    test("abs", () => {
        expect(abs(2)).toBe(2);
    });

    test("localAbs", () => {
        expect(localAbs(2)).toBe(2);
    });
});
