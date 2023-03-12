/**
 * Returns the CRAP score for a function.
 *
 * The CRAP score is a measure of the complexity of a function ranging from 1 (best) to infinity (worst).
 * It is computed as follows:
 *
 * > complexity^2 * (1 - coverage)^3 + complexity
 *
 * where:
 *      - complexity is the cyclomatic complexity of the function
 *      - coverage is the statement coverage of the function between 0 (no coverage) and 1 (full coverage)
 */
export function crap({ complexity, coverage }: { complexity: number; coverage: number }): number {
    return complexity ** 2 * (1 - coverage) ** 3 + complexity;
}
