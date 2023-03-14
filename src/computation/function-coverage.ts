import { FileCoverageData } from "istanbul-lib-coverage";
import { locationIsInRange } from "./location-in-range.js";

export function getCoverageForFunction({
    functionId,
    fileCoverage,
}: {
    functionId: string;
    fileCoverage: FileCoverageData;
}): { covered: number; total: number } {
    // TODO: this can probably be more efficient - e.g., stop after first statement out of range
    const statementsIdsInFunction = Object.entries(fileCoverage.statementMap)
        .filter(
            ([, { start, end }]) =>
                // FIXME: this first check is weird, is there a better way to determine statements that belong to functions?
                //          - especially for the "function definition" statement
                //          - maybe always just +1 for total statements (also avoids division by 0), as each function has to be declared
                locationIsInRange({ location: end, range: fileCoverage.fnMap[functionId].decl }) ||
                locationIsInRange({ location: start, range: fileCoverage.fnMap[functionId].loc }),
        )
        .map(([id]) => id);
    const statementCoverage = statementsIdsInFunction.map((id) => fileCoverage.s[id]);

    return {
        covered: statementCoverage.filter((coverage) => coverage > 0).length,
        total: statementCoverage.length, // FIXME: can totalStatements be 0?
    };
}
