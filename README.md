# CRAP Score

Calculate and visualise the CRAP score of a JS/TS project using the provided API or CLI.

## Example

The CRAP report of the project itself can be found under <https://ahilke.github.io/js-crap-score/>.

## What is CRAP?

The CRAP score is a measure of the risk of a function ranging from 1 (best) to infinity (worst). It stands for Change Risk Anti-Patterns and is computed as follows:

> complexity^2 \* (1 - coverage)^3 + complexity

where complexity is the cyclomatic complexity of the function and coverage is the statement coverage as number between 0 (no coverage) and 1 (fully covered).

Combining complexity and coverage information, the CRAP score gives you insight into your riskiest functions, i.e. functions that are the most likely to contain bugs. You can reduce the risk and thus the CRAP score by either improving test coverage or refactoring your function to decrease complexity (e.g. by extracting functions).

## How to Use

For the initial setup:

```sh
cd eslint-plugin-crap
npm ci
npm run build
cd ..
npm ci
```

Afterwards, use `npm run start` or any of the other start commands and provide an istanbul JSON coverage report as input. This will generate both a HTML and a JSON report in the `crap-report` folder with the CRAP score of each function in the original istanbul report.

### istanbul JSON Coverage Report

If you are using `jest`, you can generate an istanbul JSON coverage report by adding `collectCoverage: true` and `coverageReporters: ["json"]` to your configuration. This will generate a JSON report under `coverage-final.json`.

Make sure to also review other configuration related to coverage, especially `collectCoverageFrom`. This allows you to include files in your report even if they are not covered. This is important, since any uncovered function in your project may have a very high CRAP score.
