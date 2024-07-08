/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        port: 8067,
    },
    test: {
        coverage: {
            enabled: true,
            provider: "istanbul",
            reporter: ["json", "html"],
        },
    },
});
