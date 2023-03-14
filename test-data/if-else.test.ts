import { describe, test, expect } from "@jest/globals";
import { ifCovered, elseCovered, fullyCovered } from "./if-else.js";

describe("if-else", () => {
    describe("ifCovered", () => {
        test("cover if branch", () => {
            expect(ifCovered(1)).toBe(1);
        });
    });

    // TODO: test the report created from this is interpreted the same as by istanbul
    /*
     * istanbul reports this as:
     *   75% Statements 3/4 50% Branches 1/2 100% Functions 1/1 75% Lines 3/4
     */
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
