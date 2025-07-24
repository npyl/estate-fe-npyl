import { BrowserContext, CDPSession, Page } from "@playwright/test";
import NETWORK_PRESETS, { METHOD } from "./constants";

const _go2G = async (cdpSession: CDPSession) =>
    await cdpSession.send(METHOD, NETWORK_PRESETS.Regular2G);

const _reset = async (cdpSession: CDPSession) =>
    await cdpSession.send(METHOD, NETWORK_PRESETS.Reset);

const getNetworkControl = async (context: BrowserContext, page: Page) => {
    const session = await context.newCDPSession(page);

    const go2G = () => _go2G(session);
    const reset = () => _reset(session);

    // INFO: there is no go offline method because (to my knowledge) going offline using cdp is not reliable!

    return { go2G, reset };
};

export default getNetworkControl;
