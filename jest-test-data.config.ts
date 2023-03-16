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
    testMatch: ["**/test-data/**/*.test.ts"],
    collectCoverageFrom: ["test-data/**/*.[jt]s"],
    coveragePathIgnorePatterns: ["coverage/"],
    coverageDirectory: "./test-data/coverage",
    coverageReporters: ["json", "html"],
} satisfies JestConfigWithTsJest;

export default config;
