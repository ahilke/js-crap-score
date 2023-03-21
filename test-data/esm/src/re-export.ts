export { ifCovered as abs } from "./if-else/if-covered";

export function localAbs(x: number): number {
    if (x > 0) {
        return x;
    } else {
        return -x;
    }
}
