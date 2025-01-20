const toNumber = (s?: string | string[]) => {
    if (typeof s !== "string") throw new Error("Not a string: " + s);
    const res = parseInt(s, 10);
    if (isNaN(res)) throw new Error("Not containing a number: " + s);
    return res;
};

const toNumberSafe = (s?: string | string[]) => {
    try {
        return toNumber(s);
    } catch (ex) {
        return -1;
    }
};

export { toNumberSafe };
export default toNumber;
