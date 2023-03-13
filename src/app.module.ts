import { Logger, Module } from "@nestjs/common";
import { ComputeCrapCommand } from "./compute-crap.command.js";
import { FileSystemService } from "./file-system.service.js";

@Module({
    providers: [ComputeCrapCommand, Logger, FileSystemService],
})
export class AppModule {}
