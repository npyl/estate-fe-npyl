const isDebug = process.env.NPYL_DEBUG === "1";

const debugLog = (...s: any) => {
    if (!isDebug) return;
    console.log(`[debug]: `, ...s);
};

export default debugLog;
