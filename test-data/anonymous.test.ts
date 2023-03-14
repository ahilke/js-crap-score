import { describe, expect, test } from "@jest/globals";
import { functionExpression, MyClass } from "./anonymous.js";

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
        // TODO: test the report created from this is interpreted the same as by istanbul
        /*
         * istanbul reports this as:
         *   100% Statements 3/3 50% Branches 1/2 100% Functions 1/1 100% Lines 1/1
         */
        test("cover if branch", () => {
            expect(functionExpression(1)).toBe(1);
        });
    });
});
