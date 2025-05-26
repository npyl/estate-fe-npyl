import { CDPSession } from "@playwright/test";
import runInNetworkMode from ".";
import NETWORK_PRESETS from "./constants";

const runOffline = (cdpSession: CDPSession, cb: () => Promise<any>) =>
    runInNetworkMode(cdpSession, cb, NETWORK_PRESETS.Offline);

export default runOffline;
