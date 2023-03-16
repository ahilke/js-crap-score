/**
 * Based on `complexity` rule from ESLint, but modified for this project.
 *
 * @see https://github.com/eslint/eslint/blob/v8.36.0/lib/rules/complexity.js
 */

import { ASTUtils } from "@typescript-eslint/utils";

function upperCaseFirst(s: string): string {
    if (s.length === 0) {
        return s;
    }
    return s[0].toUpperCase() + s.slice(1);
}

function isLogicalAssignmentOperator(operator: string): boolean {
    return ["&&=", "||=", "??="].includes(operator);
}

export default {
    meta: {
        type: "suggestion",
        schema: [],
        messages: {
            complex: "{{name}} has a complexity of {{complexity}}.",
            enum: "TypeScript Enum {{name}}.",
        },
    },
    create(context: any) {
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
            AssignmentExpression(node: any) {
                if (isLogicalAssignmentOperator(node.operator)) {
                    increaseComplexity();
                }
            },

            onCodePathEnd(codePath: any, node: any) {
                const complexity = complexities.pop()!;

                // TODO: exclude class-field initializer & static block
                /*
                 * This rule only evaluates complexity of functions, so "program" is excluded.
                 * Class field initializers and class static blocks are implicit functions. Therefore,
                 * they shouldn't contribute to the enclosing function's complexity, but their
                 * own complexity should be evaluated.
                 */
                if (
                    codePath.origin !== "function" &&
                    codePath.origin !== "class-field-initializer" &&
                    codePath.origin !== "class-static-block"
                ) {
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
                    messageId: "complex",
                    data: {
                        name: upperCaseFirst(name),
                        complexity,
                    },
                });
            },

            // report enums, so that we can match them against the coverage data
            TSEnumDeclaration: (node: any) => {
                context.report({
                    node,
                    messageId: "enum",
                    data: {
                        name: `Enum '${node.id.name}'`,
                        foo: 3,
                    },
                });
            },
        };
    },
};
