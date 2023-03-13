import { describe, expect, test } from "@jest/globals";
import { switchCase } from "./switch.js";

// TODO: test the report created from this is interpreted the same as by istanbul
/*
 * istanbul reports this as:
 *   80% Statements 4/5 66.66% Branches 2/3 100% Functions 1/1 80% Lines 4/5
 */
describe("switchCase", () => {
    test("first case", () => {
        expect(switchCase("foo")).toBe("bar");
    });
    test("default case", () => {
        expect(switchCase("foobar")).toBe("foobar");
    });
});
