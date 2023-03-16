# Test Data

This folder contains code and tests to generate an `istanbul` test coverage report. This report, located under `test-data/coverage/coverage-final.json`, is used as input for tests of the actual source code in `src`.

## Running the Test Suite

To run the tests and generate the coverage report, run the following script in the root directory:

```sh
npm run test:generate-data
```

This will also generate an HTML report under `test-data/coverage/index.html` which can be used to check stats reported by `istanbul`, like number of (covered statements).
