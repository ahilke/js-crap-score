import { Logger, Module } from "@nestjs/common";
import { ComputeCrapCommand } from "./compute-crap.command.js";
import { FileSystemService } from "./file-system.service.js";
import { TestCoveragePathQuestions } from "./test-coverage-path.question.js";

@Module({
    providers: [ComputeCrapCommand, TestCoveragePathQuestions, Logger, FileSystemService],
})
export class AppModule {}
