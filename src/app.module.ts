import { Logger, Module } from "@nestjs/common";
import { ComputeCrapCommand } from "./command/compute-crap.command.js";
import { TestCoveragePathQuestions } from "./command/test-coverage-path.question.js";
import { FileSystemService } from "./file-system.service.js";

@Module({
    providers: [ComputeCrapCommand, TestCoveragePathQuestions, Logger, FileSystemService],
})
export class AppModule {}
