import { FileCoverageData, Location, Range } from "istanbul-lib-coverage";

export function getCoverageForFunction({
    functionId,
    fileCoverage,
}: {
    functionId: string;
    fileCoverage: FileCoverageData;
}): number {
    // TODO: this can probably be more efficient - e.g., stop after first statement out of range
    const statementsIdsInFunction = Object.entries(fileCoverage.statementMap)
        .filter(
            ([, { start, end }]) =>
                // FIXME: this first check is weird, is there a better way to determine statements that belong to functions?
                //          - especially for the "function definition" statement
                //          - maybe always just +1 for total statements (also avoids division by 0), as each function has to be declared
                locationIsInRange({ location: end, range: fileCoverage.fnMap[functionId].decl }) ||
                locationIsInRange({ location: start, range: fileCoverage.fnMap[functionId].loc })
        )
        .map(([id]) => id);
    const statementCoverage = statementsIdsInFunction.map((id) => fileCoverage.s[id]);
    const totalStatements = statementCoverage.length;
    const coveredStatements = statementCoverage.filter((coverage) => coverage > 0).length;

    return coveredStatements / totalStatements; // FIXME: can totalStatements be 0?
}

/**
 * Determines if `location` is within `range`.
 *
 * Has undefined behaviour if `column` is `null`, as `end` of `statementMap` sometimes seem to have.
 * Use only with `start` location.
 */
function locationIsInRange({ location, range }: { location: Location; range: Range }) {
    if (location.line < range.start.line || location.line > range.end.line) {
        return false;
    }
    if (location.line === range.start.line && location.column < range.start.column) {
        return false;
    }
    if (location.line === range.end.line && location.column > range.end.column) {
        return false;
    }

    return true;
}
