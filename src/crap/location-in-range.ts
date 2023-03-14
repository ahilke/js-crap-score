/**
 * Determines if `location` is within `range`.
 *
 * Has undefined behaviour if `column` is `null`, as `end` of `statementMap` sometimes seem to have.
 * Use only with `start` location.
 */
export function locationIsInRange({ location, range }: { location: Location; range: Range }): boolean {
    if (location.line < range.start.line || location.line > range.end.line) {
        return false;
    }
    if (location.line === range.start.line && location.column < range.start.column) {
        return false;
    }
    if (location.line === range.end.line && location.column > range.end.column) {
        return false;
    }

    return true;
}

export interface Location {
    line: number;
    column: number;
}

export interface Range {
    start: Location;
    end: Location;
}
