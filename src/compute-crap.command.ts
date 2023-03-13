import { CommandRunner, RootCommand } from "nest-commander";

@RootCommand({})
export class ComputeCrapCommand extends CommandRunner {
    async run(inputs: string[], options: Record<string, any>): Promise<void> {
        console.log("hi!");
    }
}
