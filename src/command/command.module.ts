import { Module } from "@nestjs/common";
import { CrapModule } from "../crap/crap.module.js";
import { ComputeCrapCommand } from "./compute-crap.command.js";
import { TestCoveragePathQuestions } from "./test-coverage-path.question.js";

@Module({
    imports: [CrapModule],
    providers: [ComputeCrapCommand, TestCoveragePathQuestions],
})
export class CommandModule {}
