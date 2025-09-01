// TODO: does not support thousands separated by dot!

import debugLog from "@/_private/debugLog";

const toNumber = (s: string) => {
    const res = parseInt(s, 10);
    if (isNaN(res)) throw new Error("Not containing a number: " + s);
    return res;
};

/**
 * @param s any input but we only allow "string"
 */
const toNumberSafe = (s?: any) => {
    try {
        if (typeof s !== "string") return -1;
        if (!s) return -1;
        return toNumber(s);
    } catch (ex) {
        debugLog(ex);
        return -1;
    }
};

export default toNumberSafe;
