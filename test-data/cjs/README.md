# CommonJS Test Project

This project uses the CommonJS (CJS) module system. It is used since such projects behave differently to ESM projects with regards to test coverage reports from istanbul.

Known differences:

-   Statement count differs (example: `if-else/if-covered.ts` has 3 statements in ESM, 4 in CJS)
-   Re-exports are reported as functions for CJS, but nor for ESM (see `re-exports.ts`).
-   Classes without constructor are reported as functions (see `class.ts`).
