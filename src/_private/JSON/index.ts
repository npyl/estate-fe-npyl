import debugLog from "@/_private/debugLog";

const onlyOnce = <T extends (...args: any[]) => any>(cb: T) => {
    let hasRun = false;
    return (...args: Parameters<T>): ReturnType<T> => {
        if (!hasRun) {
            hasRun = true;
            return cb(...args);
        }
        return undefined as ReturnType<T>;
    };
};

const WARN_MESSAGE = "JSON.parse: Use safe-alternative JSON.parseSafe instead";

const warnOnce = onlyOnce(() => {
    debugLog(WARN_MESSAGE);
});

// --------------------------------------------------------------------------

const orgParse = JSON.parse;

JSON.parse = (...args) => {
    warnOnce();
    return orgParse(...args);
};

JSON.parseSafe = function <T>(
    text: string | null | undefined,
    reviver?: (key: string, value: any) => any
) {
    try {
        if (!text) return null;
        return orgParse(text, reviver) as T;
    } catch (ex) {
        console.log(ex);
        return null;
    }
};
