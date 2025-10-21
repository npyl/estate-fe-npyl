const JSONParseSafe = function <T>(
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
