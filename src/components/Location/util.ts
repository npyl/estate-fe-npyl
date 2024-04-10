const isNumberString = (input: string | undefined): boolean =>
    !isNaN(Number(input));

export default isNumberString;
