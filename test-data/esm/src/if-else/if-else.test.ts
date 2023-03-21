import { describe, test, expect } from "@jest/globals";
import { elseCovered } from "./else-covered.js";
import { fullyCovered } from "./fully-covered.js";
import { ifCovered } from "./if-covered.js";

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
