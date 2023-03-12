import { readFileSync } from "fs";
import { CoverageMapData, FileCoverageData, Location, Range } from "istanbul-lib-coverage";

// 1. read in coverage
// 2. compute function statement coverage
// 3. trigger jshint

const coveragePath = new URL("../../test/coverage/coverage-final.json", import.meta.url);
/** @see https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md */
const coverageReport: CoverageMapData = JSON.parse(readFileSync(coveragePath, "utf-8"));

Object.values(coverageReport).forEach((fileCoverage) => {
    const { fnMap } = fileCoverage;
    Object.entries(fnMap).forEach(([id, { name }]) => {
        // TODO: probably should not pass the whole `fileCoverage`?
        const coverage = getCoverageForFunction({ functionId: id, fileCoverage });
        console.log(`function '${name}' is ${coverage * 100}%} covered`);
    });
});

function getCoverageForFunction({
    functionId,
    fileCoverage,
}: {
    functionId: string;
    fileCoverage: FileCoverageData;
}): number {
    const { start: fnStart, end: fnEnd } = fileCoverage.fnMap[functionId].loc;

    // TODO: this can probably be more efficient - e.g., stop after first statement out of range
    const statementsIdsInFunction = Object.entries(fileCoverage.statementMap)
        .filter(([, { start }]) => locationIsInRange({ location: start, range: { start: fnStart, end: fnEnd } }))
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
