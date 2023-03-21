export class MyClass {
    // Functions inside classes are reported as anonymous in `coverage-final.json` (but not by ESLint).
    classFunction(x: number): number {
        while (true) {
            if (x > 0) {
                return x;
            } else {
                return -x;
            }
        }
    }
}
