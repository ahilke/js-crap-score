/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 8067,
    },
    test: {
        // reporters: [],
        coverage: {
            enabled: true,
            provider: "istanbul",
            reporter: [
                "json",
                "html",
                // "/Users/arno.hilke/projects/js-crap-score/src/jest-reporter/reporter.ts",
                // "/Users/arno.hilke/projects/js-crap-score/dist/jest-reporter/reporter.js",
                // "/Users/arno.hilke/projects/js-crap-score/src/vitest-reporter/reporter.cts",
                "/Users/arno.hilke/projects/js-crap-score/dist/vitest-reporter/reporter.cjs",
                // "crap-score",
            ],
        },
    },
});
