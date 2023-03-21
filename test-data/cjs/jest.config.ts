import type { JestConfigWithTsJest } from "ts-jest";

/**
 * Test suite to create test coverage data as input for unit tests.
 */
const config = {
    preset: "ts-jest",
    testMatch: ["**/*.test.ts"],
    collectCoverageFrom: ["./src/**/*.[jt]s"],
    collectCoverage: true,
    coveragePathIgnorePatterns: ["./coverage/"],
    coverageDirectory: "./coverage/",
    coverageReporters: ["json", "html"],
} satisfies JestConfigWithTsJest;

export default config;
