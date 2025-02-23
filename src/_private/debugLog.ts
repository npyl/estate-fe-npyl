const isDebug = process.env.NODE_ENV === "development";

const debugLog = (...s: any) => {
    if (!isDebug) return;
    console.log(`[debug]: `, ...s);
};

export default debugLog;
