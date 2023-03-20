/**
 * Based on `complexity` rule from ESLint, but modified for this project.
 *
 * @see https://github.com/eslint/eslint/blob/v8.36.0/lib/rules/complexity.js
 */

import { ASTUtils, ESLintUtils } from "@typescript-eslint/utils";

function isLogicalAssignmentOperator(operator: string): boolean {
    return ["&&=", "||=", "??="].includes(operator);
}

export default ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "suggestion",
        schema: [],
        messages: {
            function: "{{name}} has a complexity of {{complexity}}.",
            enum: "TypeScript Enum {{name}}.",
            export: "Export.",
        },
    },
    defaultOptions: [],
    create(context) {
        // Using a stack to store complexity per code path
        const complexities: number[] = [];

        function increaseComplexity(): void {
            complexities[complexities.length - 1]++;
        }

        return {
            onCodePathStart() {
                // The initial complexity is 1, representing one execution path in the CodePath
                complexities.push(1);
            },

            // Each branching in the code adds 1 to the complexity
            CatchClause: increaseComplexity,
            ConditionalExpression: increaseComplexity,
            LogicalExpression: increaseComplexity,
            ForStatement: increaseComplexity,
            ForInStatement: increaseComplexity,
            ForOfStatement: increaseComplexity,
            IfStatement: increaseComplexity,
            WhileStatement: increaseComplexity,
            DoWhileStatement: increaseComplexity,

            // Avoid `default`
            "SwitchCase[test]": increaseComplexity,

            // Logical assignment operators have short-circuiting behavior
            AssignmentExpression(node) {
                if (isLogicalAssignmentOperator(node.operator)) {
                    increaseComplexity();
                }
            },

            onCodePathEnd: ((codePath: any, node: any) => {
                const complexity = complexities.pop()!;

                /*
                 * This rule only evaluates complexity of functions, so "program" is excluded.
                 */
                if (codePath.origin !== "function") {
                    return;
                }

                let name;
                if (codePath.origin === "class-field-initializer") {
                    name = "class field initializer";
                } else if (codePath.origin === "class-static-block") {
                    name = "class static block";
                } else {
                    name = ASTUtils.getFunctionNameWithKind(node);
                }

                context.report({
                    node,
                    messageId: "function",
                    data: {
                        name,
                        complexity,
                    },
                });
            }) as any, // onCodePathEnd is not typed in @typescript-eslint/utils, neither is CodePath

            // report enums, so that we can match them against the coverage data
            TSEnumDeclaration: (node) => {
                context.report({
                    node,
                    messageId: "enum",
                    data: {
                        name: `enum '${node.id.name}'`,
                        foo: 3,
                    },
                });
            },

            // report exports, so that we can match them against the coverage data
            ExportAllDeclaration: (node) => {
                context.report({
                    node,
                    messageId: "export",
                });
            },
            ExportDefaultDeclaration: (node) => {
                context.report({
                    node,
                    messageId: "export",
                });
            },
            ExportNamedDeclaration: (node) => {
                context.report({
                    node,
                    messageId: "export",
                });
            },
        };
    },
});
