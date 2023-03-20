# Test Data

This folder contains code and tests for several test projects to generate an `istanbul` test coverage report. These reports, located under `test-data/<PROJECT>/coverage/coverage-final.json`, are used as input for tests of the actual source code in `src`.

## Running the Test Suite

To run the tests and generate the coverage reports, run the following script in the root directory:

```sh
npm run test:generate-data
```

This will also generate an HTML report under `test-data/<PROJECT>/coverage/index.html` which can be used to check stats reported by `istanbul`, like number of (covered) statements.
