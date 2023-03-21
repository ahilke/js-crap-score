/*
 * Classes without constructor are reported as functions by istanbul for CommonJS.
 *
 * We're not exporting the class directly, because otherwise the CRAP report would fall back to reporting the export.
 */
class MyClass {
    abs = (x: number): number => {
        if (x > 0) {
            return x;
        } else {
            return -x;
        }
    };
}

export default MyClass;
