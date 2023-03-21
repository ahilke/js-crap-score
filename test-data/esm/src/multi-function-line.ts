export function evenCubes(list: number[]): number[] {
    // test that multiple functions on the same line are correctly detected
    return list.map((n) => n ** 3).filter((n) => n % 2 === 0);
}
