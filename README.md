# CRAP Score

Calculate and visualize the CRAP score of a JS/TS project using the provided `jest` integration, CLI, or API.

## Example

The CRAP report of the project itself can be found under <https://ahilke.github.io/js-crap-score/>.

## What is CRAP?

The CRAP score is a measure of the risk of a function ranging from 1 (best) to infinity (worst). It stands for Change Risk Anti-Patterns and is computed as follows:

> complexity^2 \* (1 - coverage)^3 + complexity

where complexity is the cyclomatic complexity of the function and coverage is the statement coverage as number between 0 (no coverage) and 1 (fully covered).

Combining complexity and coverage information, the CRAP score gives you insight into your riskiest functions, i.e. functions that are the most likely to contain bugs. You can reduce the risk and thus the CRAP score by either improving test coverage or refactoring your function to decrease complexity (e.g. by extracting functions).

## How to Use

### Jest Reporter

Add `crap-score` as [test reporter](https://jestjs.io/docs/configuration#reporters-arraymodulename--modulename-options) to jest.
When `jest` is run with coverage enabled, this will also generate a CRAP report. Example for `jest.config.json`:

```json
"reporters": ["default", "crap-score"],
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
