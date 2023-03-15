/**
 * Determines if given location is within given range.
 *
 * Falls back to optimistic comparison on line if column is undefined.
 *
 * @param location  Location to check.
 * @param range     Range to check against.
 * @returns         True if location is within range, false otherwise.
 */
export function locationIsInRange({ location, range }: { location: Location; range: Range }): boolean {
    if (location.line < range.start.line || location.line > range.end.line) {
        return false;
    }

    if (!location.column) {
        return true;
    }

    if (range.start.column && location.line === range.start.line) {
        return location.column >= range.start.column;
    }

    if (range.end.column && location.line === range.end.line) {
        return location.column <= range.end.column;
    }

    return true;
}

export interface Location {
    line: number;
    column: number | undefined;
}

export interface Range {
    start: Location;
    end: Location;
}
