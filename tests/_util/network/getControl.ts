import { BrowserContext, CDPSession, Page } from "@playwright/test";
import NETWORK_PRESETS, { METHOD } from "./constants";

const _goOffline = async (cdpSession: CDPSession) =>
    await cdpSession.send(METHOD, NETWORK_PRESETS.Offline);

const _go3G = async (cdpSession: CDPSession) =>
    await cdpSession.send(METHOD, NETWORK_PRESETS.Regular3G);

const _reset = async (cdpSession: CDPSession) =>
    await cdpSession.send(METHOD, NETWORK_PRESETS.Reset);

const getNetworkControl = async (context: BrowserContext, page: Page) => {
    const session = await context.newCDPSession(page);

    const goOffline = () => _goOffline(session);
    const go3G = () => _go3G(session);
    const reset = () => _reset(session);

    return { goOffline, go3G, reset };
};

export default getNetworkControl;
