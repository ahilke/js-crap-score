import { FileCoverageData } from "istanbul-lib-coverage";
import { locationIsInRange } from "./location-in-range.js";

export function getCoverageForFunction({
    functionId,
    fileCoverage,
}: {
    functionId: string;
    fileCoverage: FileCoverageData;
}): { covered: number; total: number } {
    const statementsIdsInFunction = Object.entries(fileCoverage.statementMap)
        .filter(
            ([, { start, end }]) =>
                locationIsInRange({ location: start, range: fileCoverage.fnMap[functionId].decl }) ||
                locationIsInRange({ location: end, range: fileCoverage.fnMap[functionId].decl }) ||
                locationIsInRange({ location: start, range: fileCoverage.fnMap[functionId].loc }) ||
                locationIsInRange({ location: end, range: fileCoverage.fnMap[functionId].loc }),
        )
        .map(([id]) => id);
    const statementCoverage = statementsIdsInFunction.map((id) => fileCoverage.s[id]);

    return {
        covered: statementCoverage.filter((coverage) => coverage > 0).length,
        total: statementCoverage.length,
    };
}
