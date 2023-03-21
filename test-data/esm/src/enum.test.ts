import { describe, expect, test } from "@jest/globals";
import { MyEnum, reverseEnum } from "./enum.js";

describe("enum", () => {
    describe("reverseEnum", () => {
        test("second case", () => {
            expect(reverseEnum(MyEnum.B)).toBe("B");
        });
    });
});
