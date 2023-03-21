// enums are reported as functions by istanbul
export enum MyEnum {
    A = "a",
    B = "b",
    C = "c",
}

export function reverseEnum(value: MyEnum): string {
    switch (value) {
        case MyEnum.A:
            return "A";
        case MyEnum.B:
            return "B";
        case MyEnum.C:
            return "C";
    }
}
