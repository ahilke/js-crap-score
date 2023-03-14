import { Module } from "@nestjs/common";
import { CommandModule } from "./command/command.module.js";
import { CrapModule } from "./crap/crap.module.js";

@Module({
    imports: [CrapModule, CommandModule],
})
export class AppModule {}
