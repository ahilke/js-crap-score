import { Question, QuestionSet } from "nest-commander";

@QuestionSet({ name: "test-coverage-path-questions" })
export class TestCoveragePathQuestions {
    @Question({
        name: "testCoveragePath",
        message: 'Location of "coverage-final.json" file:',
    })
    public parseTestCoveragePath(val: string): string {
        return val;
    }
}
