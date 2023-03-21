import { describe, expect, test } from "@jest/globals";
import MyClass from "./class";

describe("class", () => {
    test("abs", () => {
        const instance = new MyClass();
        expect(instance.abs(2)).toBe(2);
    });
});
