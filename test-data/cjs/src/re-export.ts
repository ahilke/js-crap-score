/*
 * Re-exports are reported as functions by istanbul if using CommonJS.
 */
export { ifCovered as abs } from "./if-else/if-covered";
export * as ifCovered from "./if-else/if-covered";

export function localAbs(x: number): number {
    if (x > 0) {
        return x;
    } else {
        return -x;
    }
}

import { ifCovered as abs } from "./if-else/if-covered";
import * as ifCovered from "./if-else/if-covered";

/*
 * Multi-line exports are reported with differing locations by istanbul and ESLint.
 *
 * istanbul reports the single line of the export as start.
 * As end it reports the same line (`decl`) or the line of the original import (`loc`)!
 *
 * ESLint reports the whole export statement.
 */
export {
    abs as absolute, // keep this as multi-line
    ifCovered as ifCoveredExport,
};
