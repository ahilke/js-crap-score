# CRAP Score

[![npm version](https://badge.fury.io/js/crap-score.svg)](https://badge.fury.io/js/crap-score)

Use CRAP to estimate and visualize the change risk of your JS/TS project.

-   [Example](#example)
-   [What is CRAP?](#what-is-crap)
-   [How to Use](#how-to-use)
    -   [Jest Reporter](#jest-reporter)
    -   [CLI](#cli)
    -   [API](#api)
    -   [istanbul JSON Coverage Report](#istanbul-json-coverage-report)
-   [Contributing](#contributing)

## Example

The HTML CRAP report of the project itself can be found under <https://ahilke.github.io/js-crap-score/>.

## What is CRAP?

The CRAP score is a measure of the risk of a function ranging from 1 (best) to infinity (worst). It uses complexity and coverage information to give an estimate how likely it is that a function contains bugs or breaks with future changes.

CRAP is an acronym for Change Risk Anti-Patterns and is computed as follows: $comp^2 \cdot (1 - cov)^3 + comp$, where `comp` is the cyclomatic complexity of the function and `cov` is the statement coverage as number between 0 (no coverage) and 1 (fully covered).

A common guideline is to address functions with a CRAP score above 30 by either adding additional tests or refactoring the function to reduce complexity. This translates to simple functions with complexity 5 or lower not requiring any test coverage, while a function with complexity over 30 always requires refactoring.

## How to Use

This package provides multiple ways to generate and collect information about coverage, complexity and CRAP for each function within your project. It generates both a human-readable HTML report and a JSON report for further processing.

Usage Options:

-   run it together with your tests by adding it to your [jest configuration](#jest-reporter)
-   run it from the [command line](#cli)
-   integrate it into your [own program](#api)

### Jest Reporter

Add `crap-score` as [test reporter](https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options) to jest.
When `jest` is run with coverage enabled, this will also generate a CRAP report. Example for `jest.config.json`:

```json
"reporters": ["default", "crap-score"]
```

The reporter also accepts options, for example:

```json
"reporters": [
    "default",
    [
        "crap-score",
        {
            "jsonReportFile": "crap.json",
        }
    ]
]
```

A typed interface for the reporter options is available via `import type { ReporterOptions } from "crap-score";`.

Available options:

| Option         | Description                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| jsonReportFile | Specifies path where the JSON report will be written to. Defaults to `crap-report/crap-report.json`. Pass `false` to disable JSON report. |
| htmlReportDir  | Specifies path where the HTML report will be written to. Defaults to `crap-report/html/`. Pass `false` to disable HTML report.            |
| log            | Changes log behaviour. `"silent"` suppresses all logs. `"debug"` prints additional logs.                                                  |

### CLI

Install the package (or use it directly via npx), then just run `npx crap <path-to-coverage>`.
The command expects an istanbul JSON coverage report as input (see [JSON Coverage Report](#istanbul-json-coverage-report)) and generates both an HTML and a JSON report in the `crap-report` folder, containing the CRAP score of each function in the original istanbul report.

```sh
crap --help
```

### API

#### ESM

```ts
import { getCrapReport, CrapReport } from "crap-score";

const report: CrapReport = await getCrapReport({
    testCoverage: "./coverage/coverage-final.json",
});
```

#### CommonJS

To use the library API in a CommonJS project, you will need to use dynamic `import` statements as this is a ESM library:

```ts
async function main() {
    const { getCrapReport } = await import("crap-score");
    const report = await getCrapReport({
        testCoverage: "./coverage/coverage-final.json",
    });
}
```

If you are using TypeScript, make sure to have `"moduleResolution": "node16"` to avoid `import` being transformed into `require`. If that is not an option, you can work around it via `eval`:

```ts
async function main() {
    const { getCrapReport } = await eval("import('crap-score')");
    const report = await getCrapReport({
        testCoverage: "./coverage/coverage-final.json",
    });
}
```

### istanbul JSON Coverage Report

If you are using `jest`, you can generate an istanbul JSON coverage report by adding `collectCoverage: true` and `coverageReporters: ["json"]` to your configuration. This will generate a JSON report under `coverage-final.json`.

Make sure to also review other configuration related to coverage, especially `collectCoverageFrom`. This allows you to include files in your report even if they are not covered. This is important, since any uncovered function in your project may have a very high CRAP score.

## Contributing

Got any feedback? I'm eager to hear it! Please open an issue or send me an email.

If you want to contribute code, please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.
