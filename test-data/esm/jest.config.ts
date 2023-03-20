import type { JestConfigWithTsJest } from "ts-jest";

/**
 * Test suite to create test coverage data as input for unit tests.
 */
const config = {
    preset: "ts-jest/presets/default-esm",
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        "^.+\\.ts$": ["ts-jest", { useESM: true }],
    },
    testMatch: ["**/*.test.ts"],
    collectCoverage: true,
    collectCoverageFrom: ["./src/**/*.[jt]s"],
    coveragePathIgnorePatterns: ["./coverage/"],
    coverageDirectory: "./coverage/",
    coverageReporters: ["json", "html"],
} satisfies JestConfigWithTsJest;

export default config;
