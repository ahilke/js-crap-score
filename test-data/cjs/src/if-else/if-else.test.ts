import { describe, expect, test } from "@jest/globals";
import { ifCovered } from "./if-covered";

describe("if-else", () => {
    describe("ifCovered", () => {
        test("cover if branch", () => {
            expect(ifCovered(1)).toBe(1);
        });
    });
});
