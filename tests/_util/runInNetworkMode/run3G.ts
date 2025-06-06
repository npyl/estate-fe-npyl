import { CDPSession } from "@playwright/test";
import runInNetworkMode from ".";
import NETWORK_PRESETS from "./constants";

const run3G = (
    cdpSession: CDPSession,
    cb: () => Promise<any>,
    reset?: boolean
) => runInNetworkMode(cdpSession, cb, NETWORK_PRESETS.Regular3G, reset);

export default run3G;
