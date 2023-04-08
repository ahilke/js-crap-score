import { ConsoleLogger, LogLevel } from "@nestjs/common";

export class CrapReporterLogger extends ConsoleLogger {
    private lastError: string | undefined;

    public constructor(logLevels: LogLevel[]) {
        super("crap-score");

        this.setLogLevels(logLevels);
    }

    public override error(message: string, ...otherParams: unknown[]) {
        super.error(message, ...otherParams);
        this.lastError = message;
    }

    public getLastError(): string | undefined {
        return this.lastError;
    }
}
