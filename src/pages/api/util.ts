const toNumber = (s?: string | string[]) => {
    if (typeof s !== "string") throw new Error("Not a string: " + s);
    const res = parseInt(s, 10);
    if (isNaN(res)) throw new Error("Not containing a number: " + s);
    return res;
};

export { toNumber };
