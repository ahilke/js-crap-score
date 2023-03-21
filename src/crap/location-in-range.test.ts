import { describe, expect, test } from "@jest/globals";
import { locationIsInRange } from "./location-in-range.js";

describe("locationIsInRange", () => {
    test.each([
        {
            location: { line: 1, column: 9 },
            expected: false,
        },
        {
            location: { line: 1, column: 10 },
            expected: true,
        },
        {
            location: { line: 1, column: 15 },
            expected: true,
        },
        {
            location: { line: 1, column: 20 },
            expected: true,
        },
        {
            location: { line: 1, column: 21 },
            expected: false,
        },
    ])("is $location.line:$location.column within 1:10-1:20? $expected", ({ location, expected }) => {
        const range = {
            start: { line: 1, column: 10 },
            end: { line: 1, column: 20 },
        };
        expect(locationIsInRange({ location, range })).toBe(expected);
    });
});
