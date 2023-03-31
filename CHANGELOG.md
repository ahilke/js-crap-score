# Changelog

## NEXT

### Changed

-   Relax engine requirements and add indirect peer dependency. This should prevent warnings when installing the package.

## 1.0.1 - 2023-03-27

### Fixed

-   Handle unary generics in non-JSX files. For example, `const identity = <T>(arg: T): T => arg;` is now parsed and evaluated correctly.
