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

const WARN_MESSAGE = `JSON.parse: Use safe-alternative "@/utils/JSONParseSafe" instead`;

const warnOnce = onlyOnce(() => {
    debugLog(WARN_MESSAGE);
});

// --------------------------------------------------------------------------

const orgParse = JSON.parse;

JSON.parse = (...args) => {
    warnOnce();
    return orgParse(...args);
};
