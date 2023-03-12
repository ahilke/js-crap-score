import { describe, test, expect } from "@jest/globals";
import { abs } from "./if-else.js";

describe("if-else", () => {
    test("cover if branch", () => {
        expect(abs(1)).toBe(1);
    });
});
