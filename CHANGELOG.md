# Changelog

## [1.2.0](https://github.com/ahilke/js-crap-score/releases/tag/1.2.0) - 2023-05-20

### Added

-   HTML Report: Code block now highlights uncovered lines.
-   HTML Report: Code block now shows line numbers.

### Changed

-   HTML Report: Switched to a new syntax highlighting theme.

## [1.1.0](https://github.com/ahilke/js-crap-score/releases/tag/1.1.0) - 2023-04-08

### Added

-   Direct integration with `jest` as a test reporter. See [README.md](README.md#jest-reporter) for details.

### Changed

-   Reduce logging noise. Saved files are now only logged as `debug` (was `log`), except for the main report files.
-   Relax engine requirements and add indirect peer dependency. This should prevent warnings when installing the package.

### Removed

-   CLI no longer interactively asks for the test coverage path, instead printing the help text when invoked without an argument.

## [1.0.1](https://github.com/ahilke/js-crap-score/releases/tag/1.0.1) - 2023-03-27

### Fixed

-   Handle unary generics in non-JSX files. For example, `const identity = <T>(arg: T): T => arg;` is now parsed and evaluated correctly.
