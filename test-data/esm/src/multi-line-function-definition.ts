/**
 * istanbul reports two locations for a function, `loc` and `decl`, which differ for a multi-line definition.
 */
export const multiLineFunctionDefinition = ({
    first,
    second,
    third,
}: {
    first: number;
    second: number;
    third: number;
}): number => {
    return first + second - third;
};
