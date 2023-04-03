# Contributing

## Running the App

Use `npm run start` or any of the other start commands to run the CLI (see [CLI section of the README](./README.md#cli)). To pass arguments to the CLI, double escape them with `--`, e.g. `npm run start -- -- -j`.

## Running Tests

First, generate the coverage reports for testing using `npm run test:generate-data`.
Afterwards run the tests proper by using `npm run test` or any of the other test commands like `npm run test:debug`.

See also [test-data/README.md](test-data/README.md).

## Releasing

1. Bump the version in `package.json` and `package-lock.json` via `npm version <major|minor|patch>`.
2. Update [CHANGELOG.md](./CHANGELOG.md) for any user-facing changes. This project loosely follows the guidelines from [keepachangelog.com](https://keepachangelog.com/) and [Common Changelog](https://github.com/vweevers/common-changelog).
3. On `main`, create a release in GitHub using the version as title and the changelog as description. A new npm version will be published automatically.
