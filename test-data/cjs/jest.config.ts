import type { JestConfigWithTsJest } from "ts-jest";

/**
 * Test suite to create test coverage data as input for unit tests.
 */
const config = {
    preset: "ts-jest",
    testMatch: ["**/*.test.{ts,tsx}"],
    collectCoverageFrom: ["./src/**/*.{js,jsx,ts,tsx}"],
    collectCoverage: true,
    coveragePathIgnorePatterns: ["./coverage/"],
    coverageDirectory: "./coverage/",
    coverageReporters: ["json", "html"],
} satisfies JestConfigWithTsJest;

export default config;
