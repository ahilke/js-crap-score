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
        /*
         * Try to match against an actual function (as reported by ESLint), but fall back to other types
         * sometimes reported by istanbul as functions in specified order.
         */
        for (const type of ["function", "enum", "class", "export"] as const) {
            const matches = this.match({ coverageFunction, lintReport, type });
            if (matches.length === 1) {
                return matches[0];
            }
            if (matches.length > 1) {
                this.logger.error(
                    `Found multiple matches for ${type} in ESLint data for coverage function '${coverageFunction.name}'.`,
                    { coverageFunction, matches },
                );
                return null;
            }
        }

        this.logger.error(
            `Could not find matching function in ESLint data for coverage function '${coverageFunction.name}'.`,
            {
                location: coverageFunction.loc,
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
