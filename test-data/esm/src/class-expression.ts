const ClassExpression = class {
    abs = (x: number): number => {
        if (x > 0) {
            return x;
        } else {
            return -x;
        }
    };
};
