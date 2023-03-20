export class MyClass {
    /*
     * istanbul reports class field initializers as statements, but not as functions.
     * ESLint reports complexity for them.
     */
    private static isTest: boolean = process.env.NODE_ENV === "test";

    private checkIfTest = (): boolean => {
        if (MyClass.isTest) {
            return true;
        }
        return false;
    };

    private static supportedLanguages: string[];

    /*
     * istanbul reports static initialization blocks as statements, but not as functions.
     * ESLint reports complexity for them.
     */
    static {
        this.supportedLanguages = this.isTest ? ["en"] : ["en", "de"];
    }

    private getSupportedLanguages(): string[] {
        return MyClass.supportedLanguages;
    }
}
