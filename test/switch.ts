export function switchCase(s: string): string {
    switch (s) {
        case "foo":
            return "bar";
        case "bar":
            return "baz";
        default:
            return "foobar";
    }
}
