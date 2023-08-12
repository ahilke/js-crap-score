import { CrapReportTest } from "../crap-report.test.js";
import { anonymousTestCases } from "./anonymous.test.js";
import { classExpressionTestCases } from "./class-expression.test.js";
import { classInitializerTestCases } from "./class-initializer.test.js";
import { constructorTestCases } from "./constructor.test.js";
import { enumTestCases } from "./enum.test.js";
import { eslintCommentsTestCases } from "./eslint-comments.test.js";
import { genericTestCases } from "./generic.test.js";
import { ifElseTestCases } from "./if-else.test.js";
import { multiFunctionLineTestCases } from "./multi-function-line.test.js";
import { multiLineFunctionDefinitionTestCases } from "./multi-line-function-definition.test.js";
import { noOpTestCases } from "./no-op.test.js";
import { reExportTestCases } from "./re-export.test.js";
import { switchTestCases } from "./switch.test.js";

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
