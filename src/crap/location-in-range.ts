/**
 * Determines if given location is within given range.
 *
 * Falls back to optimistic comparison on line if column is undefined.
 *
 * @param location  Location to check.
 * @param range     Range to check against.
 * @returns         True if location is within range, false otherwise.
 */
export function locationIsInRange({
    location,
    range,
}: {
    location: { line: number; column: number | undefined };
    range: {
        start: { line: number; column: number | undefined };
        end: { line: number; column: number | undefined };
    };
}): boolean {
    if (location.line < range.start.line || location.line > range.end.line) {
        return false;
    }

    if (location.column == undefined) {
        return true;
    }

    if (
        range.start.column != undefined &&
        range.end.column != undefined &&
        location.line === range.start.line &&
        location.line === range.end.line
    ) {
        return location.column >= range.start.column && location.column <= range.end.column;
    }

    if (range.start.column != undefined && location.line === range.start.line) {
        return location.column >= range.start.column;
    }

    if (range.end.column != undefined && location.line === range.end.line) {
        return location.column <= range.end.column;
    }

    return true;
}

export interface Location extends MaybeLocation {
    line: number;
    column: number;
}

export interface MaybeLocation {
    line: number | undefined;
    column: number | undefined;
}

export interface Range {
    start: Location;
    end: Location;
}
