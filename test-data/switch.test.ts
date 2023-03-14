import { describe, expect, test } from "@jest/globals";
import { switchCase } from "./switch.js";

describe("switchCase", () => {
    test("first case", () => {
        expect(switchCase("foo")).toBe("bar");
    });
    test("default case", () => {
        expect(switchCase("foobar")).toBe("foobar");
    });
});
