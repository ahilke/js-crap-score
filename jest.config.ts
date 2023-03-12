import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testPathIgnorePatterns: ["/dist/"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};

export default config;
