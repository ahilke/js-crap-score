import type { JestConfigWithTsJest } from "ts-jest";

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
    testPathIgnorePatterns: ["<rootDir>/test-data/"],
    collectCoverageFrom: ["src/**/*.ts"],
    coverageDirectory: "./coverage",
    coverageReporters: ["json", "html"],
} satisfies JestConfigWithTsJest;

export default config;
