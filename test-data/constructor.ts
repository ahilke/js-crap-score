export class MyClass {
    public readonly x: number;

    public constructor(x: number | string) {
        if (typeof x === "string") {
            this.x = parseInt(x, 10);
        } else {
            this.x = x;
        }
    }
}
