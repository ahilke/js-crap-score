# Changelog

## NEXT

### Changed

-   Reduce logging noise. Saved files are now only logged as `debug` (was `log`), except for the main report files.
-   Relax engine requirements and add indirect peer dependency. This should prevent warnings when installing the package.

## [1.0.1](https://github.com/ahilke/js-crap-score/releases/tag/1.0.1) - 2023-03-27

### Fixed

-   Handle unary generics in non-JSX files. For example, `const identity = <T>(arg: T): T => arg;` is now parsed and evaluated correctly.
