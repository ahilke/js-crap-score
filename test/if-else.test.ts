import { describe, test, expect } from "@jest/globals";
import { ifCovered, elseCovered, fullyCovered } from "./if-else.js";

describe("if-else", () => {
    describe("ifCovered", () => {
        test("cover if branch", () => {
            expect(ifCovered(1)).toBe(1);
        });
    });

    describe("elseCovered", () => {
        test("cover else branch", () => {
            expect(elseCovered(-1)).toBe(1);
        });
    });

    describe("fullyCovered", () => {
        test("cover if branch", () => {
            expect(fullyCovered(1)).toBe(1);
        });

        test("cover else branch", () => {
            expect(fullyCovered(-1)).toBe(1);
        });
    });
});
