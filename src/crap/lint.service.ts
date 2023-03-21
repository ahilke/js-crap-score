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
        const matchedFunctions = this.match({ coverageFunction, lintReport, type: "function" });
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

        const matchedEnums = this.match({ coverageFunction, lintReport, type: "enum" });
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

        const matchedClasses = this.match({ coverageFunction, lintReport, type: "class" });
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

        const matchedExports = this.match({ coverageFunction, lintReport, type: "export" });
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

    private match({
        coverageFunction,
        lintReport,
        type,
    }: {
        coverageFunction: FunctionMapping;
        lintReport: Array<FunctionComplexity | null>;
        type: "function" | "enum" | "class" | "export";
    }) {
        const overlappingLintFunctions = lintReport.filter((lintFunction): lintFunction is FunctionComplexity => {
            if (!lintFunction || lintFunction.type !== type) {
                return false;
            }

            /*
             * The istanbul function is reported sometimes to start just before the range reported by ESLint,
             * so we also check for the end of the range.
             */
            return (
                locationIsInRange({ location: coverageFunction.loc.start, range: lintFunction }) ||
                locationIsInRange({ location: coverageFunction.loc.end, range: lintFunction })
            );
        });

        /*
         * Filter out lint functions that contain other matching functions,
         * so when matching functions inside functions we find the inner-most function that matches the position of the
         * coverage function.
         */
        return overlappingLintFunctions.filter((lintFunction) => {
            return !overlappingLintFunctions.some((containedLintFunction) => {
                if (containedLintFunction === lintFunction) {
                    return false;
                }

                return locationIsInRange({
                    location: containedLintFunction.start,
                    range: lintFunction,
                });
            });
        });
    }
}
