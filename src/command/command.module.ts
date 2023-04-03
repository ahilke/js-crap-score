import { Module } from "@nestjs/common";
import { CrapModule } from "../crap/crap.module.js";
import { ComputeCrapCommand } from "./compute-crap.command.js";

@Module({
    imports: [CrapModule],
    providers: [ComputeCrapCommand],
})
export class CommandModule {}
