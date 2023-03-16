// eslint-disable-next-line complexity
function tooComplex(a: number, b: number, c: number) {
    while (a > 0) {
        if (b < 0) {
            if (c < 0) {
                a = a + b + c;
            }
        }
    }

    if (a > 0) {
        if (b > 0) {
            if (c > 0) {
                return a + b + c;
            } else {
                return a + b;
            }
        } else {
            return a;
        }
    } else {
        return 0;
    }
}

// eslint-disable-next-line import/no-default-export
export default tooComplex;
