// import type { Awaitable, File, Reporter } from "vitest";
import type { Context, ReportBase, Summarizers } from "istanbul-lib-report";

/**
 * TODO
 * Custom vitest reporter that generates a CRAP report when run with `vitest --coverage`.
 */
// export
module.exports = class VitestCrapReporter implements ReportBase {
    // implements ReportBase
    execute(context: Context): void {
        console.log(
            "execute",
            context,
            // @ts-ignore
            context._summarizerFactory._coverageMap.data,
        );

        // TODO: make it work with ESM modules so we don't have to do this kind of import?
        import("../api/crap-report.js").then(({ getCrapReport }) => {
            getCrapReport({
                // @ts-ignore
                testCoverage: context._summarizerFactory._coverageMap.data,
                // jsonReportFile: this.jsonReportFile,
                htmlReportDir: "crap-report/html/",
                // log: this.logger,
            });
        });

        // TODO: get coverage map or coverage file path
    }
    // public onFinished(files?: File[], errors?: unknown[], coverage?: unknown): Awaitable<void> {
    //     console.log("onFinished", files, errors, coverage);
    // }
};

// export default VitestCrapReporter;
