import { readFileSync } from "fs";
import { CoverageMapData } from "istanbul-lib-coverage";

const coveragePath = new URL("../../test/coverage/coverage-final.json", import.meta.url);
/** @see https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md */
const coverage: CoverageMapData = JSON.parse(readFileSync(coveragePath, "utf-8"));

Object.values(coverage).forEach((fileCoverage) => {
    const { fnMap, f } = fileCoverage;
    Object.entries(fnMap).forEach(([id, { name, loc }]) => {
        const { line } = loc.start;
        const coverage = f[id];
        console.log(`${name} at line ${line} has coverage ${coverage}`);
    });
});

// 1. read in coverage
// 2. compute function statement coverage
// 3. trigger jshint
