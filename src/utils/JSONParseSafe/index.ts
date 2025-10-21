import debugLog from "@/_private/debugLog";

type AnyType = string | number | object;

const JSONParseSafe = function <T extends AnyType = object>(
    text: string | null | undefined,
    reviver?: (key: string, value: any) => any
) {
    try {
        if (!text) return null;
        return JSON.parse(text, reviver) as T;
    } catch (ex) {
        debugLog(ex);
        return null;
    }
};

export default JSONParseSafe;
