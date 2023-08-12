import { CrapReportTest } from "../crap-report.test.js";
import { classTestCases } from "./class.js";
import { ifElseTestCases } from "./if-else.js";
import { nestedFunctionsTestCases } from "./nested-functions.js";
import { reExportTestCases } from "./re-export.js";

export const cjsTestCases: CrapReportTest[] = [
    ...classTestCases,
    ...ifElseTestCases,
    ...nestedFunctionsTestCases,
    ...reExportTestCases,
];
