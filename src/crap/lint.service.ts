import { Injectable, Logger } from "@nestjs/common";
import { FunctionMapping } from "istanbul-lib-coverage";
import { FunctionComplexity } from "./complexity.service.js";
import { locationIsInRange } from "./location-in-range.js";

@Injectable()
export class LintService {
    public constructor(private readonly logger: Logger) {}

    public getLintFunctionForCoverageFunction({
        coverageFunction,
        lintReport,
    }: {
        coverageFunction: FunctionMapping;
        lintReport: Array<FunctionComplexity | null>;
    }): FunctionComplexity | null {
        const matchedFunctions = this.matchLintFunction({ coverageFunction, lintReport });
        if (matchedFunctions.length === 1) {
            return matchedFunctions[0];
        }
        if (matchedFunctions.length > 1) {
            this.logger.error(
                `Found multiple matching functions in ESLint data for coverage function '${coverageFunction.name}'.`,
                { coverageFunction, matchedFunctions },
            );
            return null;
        }

        /*
         * If no matching function was found by ESLint, we fall back to other types like enum, which are
         * sometimes wrongly reported as "function" by istanbul.
         */

        const matchedEnums = this.matchLintEnum({ coverageFunction, lintReport });
        if (matchedEnums.length === 1) {
            return matchedEnums[0];
        }
        if (matchedEnums.length > 1) {
            this.logger.error(
                `Found multiple matching enums in ESLint data for coverage function '${coverageFunction.name}'.`,
                { coverageFunction, matchedEnums },
            );
            return null;
        }

        const matchedClasses = this.matchLintClass({ coverageFunction, lintReport });
        if (matchedClasses.length === 1) {
            return matchedClasses[0];
        }
        if (matchedClasses.length > 1) {
            this.logger.error(
                `Found multiple matching classes in ESLint data for coverage function '${coverageFunction.name}'.`,
                { coverageFunction, matchedClasses },
            );
            return null;
        }

        const matchedExports = this.matchLintExport({ coverageFunction, lintReport });
        if (matchedExports.length === 1) {
            return matchedExports[0];
        }
        if (matchedExports.length > 1) {
            this.logger.error(
                `Found multiple matching exports in ESLint data for coverage function '${coverageFunction.name}'.`,
                { coverageFunction, matchedExports },
            );
            return null;
        }

        this.logger.error(
            `Could not find matching function in ESLint data for coverage function '${coverageFunction.name}'.`,
            {
                location: coverageFunction.loc,
                found: { matchedFunctions, matchedEnums, matchedClasses, matchedExports },
                all: lintReport,
            },
        );
        return null;
    }

    private matchLintFunction({
        coverageFunction,
        lintReport,
    }: {
        coverageFunction: FunctionMapping;
        lintReport: Array<FunctionComplexity | null>;
    }) {
        return lintReport.filter((lintFunction) => {
            if (!lintFunction || lintFunction.type !== "function") {
                return false;
            }

            return lintFunction.start.line === coverageFunction.decl.start.line;
        });
    }

    private matchLintEnum({
        coverageFunction,
        lintReport,
    }: {
        coverageFunction: FunctionMapping;
        lintReport: Array<FunctionComplexity | null>;
    }) {
        return lintReport.filter((lintFunction) => {
            if (!lintFunction || lintFunction.type !== "enum") {
                return false;
            }

            return lintFunction.start.line === coverageFunction.decl.start.line;
        });
    }

    private matchLintClass({
        coverageFunction,
        lintReport,
    }: {
        coverageFunction: FunctionMapping;
        lintReport: Array<FunctionComplexity | null>;
    }) {
        return lintReport.filter((lintFunction) => {
            if (!lintFunction || lintFunction.type !== "class") {
                return false;
            }

            return lintFunction.start.line === coverageFunction.decl.start.line;
        });
    }

    /**
     * Matches exports reported by ESLint to a function reported by istanbul.
     *
     * Exports are matched more loosely, the istanbul function just has to start within the range reported by ESLint.
     * This is because istanbul reports the line of a re-exported function, while ESLint reports the whole export block.
     * Thus, reported starting lines are different if the export block spans multiple lines.
     */
    private matchLintExport({
        coverageFunction,
        lintReport,
    }: {
        coverageFunction: FunctionMapping;
        lintReport: Array<FunctionComplexity | null>;
    }) {
        return lintReport.filter((lintFunction) => {
            if (!lintFunction || lintFunction.type !== "export") {
                return false;
            }

            return locationIsInRange({
                location: {
                    line: coverageFunction.decl.start.line,
                    column: undefined,
                },
                range: lintFunction,
            });
        });
    }
}
