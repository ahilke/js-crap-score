import type { JestConfigWithTsJest } from "ts-jest";

/**
 * Test suite to create test coverage data as input for unit tests.
 */
const config = {
    preset: "ts-jest/presets/default-esm",
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.jsx?$": "$1",
    },
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
    },
    testMatch: ["**/*.test.{ts,tsx}"],
    collectCoverage: true,
    collectCoverageFrom: ["./src/**/*.{js,jsx,ts,tsx}"],
    coveragePathIgnorePatterns: ["./coverage/"],
    coverageDirectory: "./coverage/",
    coverageReporters: ["json", "html"],
} satisfies JestConfigWithTsJest;

export default config;
