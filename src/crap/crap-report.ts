import { Location, MaybeLocation } from "./location-in-range.js";

/**
 * A JSON serializable object containing a function's statistics.
 *
 * Location of the function is taken from ESLint,
 * as it is taken directly from the source code and thus more accurate, especially for TypeScript.
 */
export interface CrapFunctionJsonObject {
    functionDescriptor: string;
    start: Location;
    end: MaybeLocation;
    complexity: number;
    statements: {
        covered: number;
        total: number;
        coverage: number;
        crap: number;
    };
}

/**
 * A JSON serializable object containing a file's statistics.
 */
export interface CrapFileJsonObject {
    [functionName: string]: CrapFunctionJsonObject;
}

/**
 * A JSON serializable object containing a project's statistics.
 */
export interface CrapReportJsonObject {
    [sourcePath: string]: CrapFileJsonObject;
}

/**
 * A runtime object containing additional information about a function's statistics.
 */
export interface CrapFunction extends CrapFunctionJsonObject {
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
