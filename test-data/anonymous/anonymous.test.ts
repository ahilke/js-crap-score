import { describe, expect, test } from "@jest/globals";
import { MyClass } from "./class-function.js";
import { functionExpression } from "./function-expression.js";

describe("anonymous", () => {
    describe("MyClass", () => {
        describe("classFunction", () => {
            test("cover if branch", () => {
                const myClass = new MyClass();
                expect(myClass.classFunction(1)).toBe(1);
            });
        });
    });

    describe("functionExpression", () => {
        test("cover if branch", () => {
            expect(functionExpression(1)).toBe(1);
        });
    });
});
