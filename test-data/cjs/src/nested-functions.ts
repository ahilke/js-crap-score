export function getFunction(type: "id" | "inverse"): (x: number) => number {
    let result: (x: number) => number;

    if (type === "id") {
        result = (x: number) => x;
    } else {
        result = (x: number) => -x;
    }

    return result;
}
