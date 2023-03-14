import { FunctionMapping } from "istanbul-lib-coverage";
import { LintFunction } from "jshint";
import { Location, locationIsInRange, Range } from "./location-in-range.js";

// TODO: check this with nested functions -> find closest match?
/**
 * Returns a matching function from the linted data for the given function from the coverage data.
 *
 * Matches based on location of the function. JSHint and istanbul report location differently,
 * so we match based on the starting point of the JSHint data being in range of the istanbul function location.
 *
 * This works given the following assumptions:
 *  - functions cannot overlap
 *  - JSHint and istanbul's reported locations have at least some overlap
 */
export function getLintFunctionForCoverageFunction({
    coverageFunction,
    lintData,
}: {
    coverageFunction: FunctionMapping;
    lintData: LintFunction[] | undefined;
}): LintFunction | undefined {
    const coverageFunctionRange: Range = {
        start: coverageFunction.loc.start,
        end: coverageFunction.loc.end,
    };
    const getLintDataStart = (lintFunction: LintFunction): Location => ({
        line: lintFunction.line,
        column: lintFunction.character,
    });
    const getLintDataEnd = (lintFunction: LintFunction): Location => ({
        line: lintFunction.last,
        column: lintFunction.lastcharacter,
    });

    return lintData?.find(
        (lintFunction) =>
            locationIsInRange({ location: getLintDataStart(lintFunction), range: coverageFunctionRange }) ||
            locationIsInRange({ location: getLintDataEnd(lintFunction), range: coverageFunctionRange }),
    );
}
