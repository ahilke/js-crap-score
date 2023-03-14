export class MyClass {
    // Functions inside classes are reported as anonymous in `coverage-final.json` (but not by jshint).
    classFunction(x: number): number {
        if (x > 0) {
            return x;
        } else {
            return -x;
        }
    }
}

export const functionExpression = (x: number): number => (x > 0 ? x : -x);
