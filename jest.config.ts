import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    testPathIgnorePatterns: ["dist/"],
    coverageDirectory: "./test/coverage",
    coverageReporters: ["json", "html"],
};

export default config;
