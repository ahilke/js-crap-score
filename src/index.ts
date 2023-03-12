import { readFileSync } from "fs";
import { CoverageMapData } from "istanbul-lib-coverage";
import { JSHINT } from "jshint";
import { crap } from "./crap-score.js";
import { getCoverageForFunction } from "./function-coverage.js";

const coveragePath = new URL("../../test/coverage/coverage-final.json", import.meta.url);
console.debug(`Loading coverage from "${coveragePath}".`);

/** @see https://github.com/gotwarlost/istanbul/blob/master/coverage.json.md */
const coverageReport: CoverageMapData = JSON.parse(readFileSync(coveragePath, "utf-8"));

Object.values(coverageReport).forEach((fileCoverage) => {
    const { fnMap, path: sourcePath } = fileCoverage;
    const sourceUrl = new URL(`file://${sourcePath}`);

    console.debug(`Loading source file from "${sourceUrl}".`);
    const source = readFileSync(sourceUrl, "utf-8");

    // TODO: check proper jshint options
    JSHINT(source);
    const jshintData = JSHINT.data();

    Object.entries(fnMap).forEach(([id, { name: functionName }]) => {
        // TODO: probably should not pass the whole `fileCoverage`?
        const coverage = getCoverageForFunction({ functionId: id, fileCoverage });
        const jshintFunctionData = jshintData?.functions?.find(({ name }) => name === functionName);
        const complexity = jshintFunctionData?.metrics.complexity;

        if (complexity) {
            console.log(`Function '${functionName}' is ${coverage * 100}%} covered.`);
            console.log(`Function '${functionName}' has complexity ${complexity}.`);
            console.log(`Function '${functionName}' has CRAP score of ${crap({ complexity, coverage })}.`);
        } else {
            console.error(`Function '${functionName}' not found in JSHint data.`);
        }
    });
});
