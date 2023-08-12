import { CrapReportTest } from "../crap-report.test.js";
import { classTestCases } from "./class.test.js";
import { ifElseTestCases } from "./if-else.test.js";
import { nestedFunctionsTestCases } from "./nested-functions.test.js";
import { reExportTestCases } from "./re-export.test.js";

export const cjsTestCases: CrapReportTest[] = [
    ...classTestCases,
    ...ifElseTestCases,
    ...nestedFunctionsTestCases,
    ...reExportTestCases,
];
