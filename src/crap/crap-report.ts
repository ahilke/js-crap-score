import { Location, MaybeLocation } from "./location-in-range.js";

/**
 * A JSON serializable object containing a function's statistics.
 *
 * Note: Function refers to what istanbul reports as functions. In a CommonJS TypeScript project,
 * this may include thins as classes, exports or enums.
 */
export interface CrapFunctionJsonObject {
    /**
     * A human readable description of the function like `arrow function`.
     * Contains the identifier for non-anonymous functions if possible like `async method 'writeFile'`.
     */
    functionDescriptor: string;
    /**
     * Beginning of the function's location in the source code.
     */
    start: Location;
    /**
     * End of the function's location in the source code. May contain `undefined` if indeterminable.
     */
    end: MaybeLocation;
    /**
     * Cyclomatic complexity of the function. Defaults to `1` for anything that is not strictly a function,
     * i.e. exports, enums, and classes.
     */
    complexity: number;
    /**
     * Statistics about the function's statements.
     */
    statements: {
        /**
         * Number of statements covered by tests.
         */
        covered: number;
        /**
         * Total number of statements in the function.
         */
        total: number;
        /**
         * Coverage of the function's statements, i.e. `covered / total`.
         */
        coverage: number;
        /**
         * CRAP score of the function.
         */
        crap: number;
    };
}

/**
 * A JSON serializable object containing a file's statistics.
 *
 * Map containing all functions as reported by istanbul for a given file using the name reported by istanbul.
 */
export interface CrapFileJsonObject {
    /**
     * Map containing all functions as reported by istanbul for a given file using the name reported by istanbul.
     */
    [functionName: string]: CrapFunctionJsonObject;
}

/**
 * A JSON serializable object containing a project's statistics.
 *
 * Map containing all files as reported by istanbul for a given project using the path reported by istanbul.
 */
export interface CrapReportJsonObject {
    [sourcePath: string]: CrapFileJsonObject;
}

/**
 * A runtime object containing additional information about a function's statistics.
 */
export interface CrapFunction extends CrapFunctionJsonObject {
    /**
     * The source code of the function, i.e. the source code of the range between `start.line` and `end.line`.
     */
    sourceCode?: string;
}

/**
 * A runtime object containing additional information about a file's statistics.
 */
export interface CrapFile extends CrapFileJsonObject {
    [functionName: string]: CrapFunction;
}

/**
 * A runtime object containing additional information about a project's statistics.
 */
export interface CrapReport extends CrapReportJsonObject {
    [sourcePath: string]: CrapFile;
}
