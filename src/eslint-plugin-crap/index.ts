import { ESLint, Rule } from "eslint";
import { complexityRule } from "./complexity.js";

export const crapPlugin: ESLint.Plugin = {
    rules: {
        complexity: complexityRule as unknown as Rule.RuleModule,
    },
};
