import { describe, expect, test } from "@jest/globals";
import { MyClass } from "./constructor.js";

describe("constructor", () => {
    test("with string", () => {
        const myClass = new MyClass("42");
        expect(myClass.x).toBe(42);
    });
});
