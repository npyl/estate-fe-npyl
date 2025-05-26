import { CDPSession } from "@playwright/test";
import NETWORK_PRESETS, { TPreset } from "./constants";

const METHOD = "Network.emulateNetworkConditions";

const runInNetworkMode = async (
    cdpSession: CDPSession,
    cb: () => Promise<any>,
    MODE: TPreset
) => {
    // Start Network Condition
    await cdpSession.send(METHOD, MODE);

    await cb();

    // End Network Condition
    await cdpSession.send(METHOD, NETWORK_PRESETS.Reset);
};

export default runInNetworkMode;
