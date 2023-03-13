import { CommandFactory } from "nest-commander";
import { AppModule } from "./app.module.js";

await CommandFactory.run(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
});
