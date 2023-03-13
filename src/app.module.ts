import { Module } from "@nestjs/common";
import { ComputeCrapCommand } from "./compute-crap.command.js";

@Module({
    providers: [ComputeCrapCommand],
})
export class AppModule {}
