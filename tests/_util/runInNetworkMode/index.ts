import { CDPSession } from "@playwright/test";
import NETWORK_PRESETS, { TPreset } from "./constants";

const METHOD = "Network.emulateNetworkConditions";

const runInNetworkMode = async (
    cdpSession: CDPSession,
    cb: () => Promise<any>,
    MODE: TPreset,
    reset: boolean = true
) => {
    // Start Network Condition
    await cdpSession.send(METHOD, MODE);

    await cb();

    // Ability to skip reset (e.g. stack multiple modes one after another)
    if (!reset) return;

    // End Network Condition
    await cdpSession.send(METHOD, NETWORK_PRESETS.Reset);
};

export default runInNetworkMode;
