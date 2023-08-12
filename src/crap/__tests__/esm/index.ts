import { CrapReportTest } from "../crap-report.test.js";
import { anonymousTestCases } from "./anonymous.js";
import { classExpressionTestCases } from "./class-expression.js";
import { classInitializerTestCases } from "./class-initializer.js";
import { constructorTestCases } from "./constructor.js";
import { enumTestCases } from "./enum.js";
import { eslintCommentsTestCases } from "./eslint-comments.js";
import { genericTestCases } from "./generic.js";
import { ifElseTestCases } from "./if-else.js";
import { multiFunctionLineTestCases } from "./multi-function-line.js";
import { multiLineFunctionDefinitionTestCases } from "./multi-line-function-definition.js";
import { noOpTestCases } from "./no-op.js";
import { reExportTestCases } from "./re-export.js";
import { switchTestCases } from "./switch.js";

export const esmTestCases: CrapReportTest[] = [
    ...anonymousTestCases,
    ...classExpressionTestCases,
    ...classInitializerTestCases,
    ...constructorTestCases,
    ...enumTestCases,
    ...eslintCommentsTestCases,
    ...genericTestCases,
    ...ifElseTestCases,
    ...multiFunctionLineTestCases,
    ...multiLineFunctionDefinitionTestCases,
    ...noOpTestCases,
    ...reExportTestCases,
    ...switchTestCases,
];
