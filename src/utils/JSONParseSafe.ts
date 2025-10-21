type AnyType = string | number | object;

const JSONParseSafe = function <T extends AnyType = object>(
    text: string | null | undefined,
    reviver?: (key: string, value: any) => any
) {
    try {
        if (!text) return null;
        return JSON.parse(text, reviver) as T;
    } catch (ex) {
        console.log(ex);
        return null;
    }
};

export default JSONParseSafe;
