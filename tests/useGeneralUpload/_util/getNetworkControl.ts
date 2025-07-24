import { Page } from "@playwright/test";
import { PING_URL } from "../../../src/_private/useNetworkAccess";

const getNetworkControl = async (page: Page) => {
    let isOnline = true;

    // IMPORTANT: we need to catch EXACTLY the same url
    await page.route(PING_URL, async (route) => {
        if (isOnline) {
            await route.fulfill({ status: 200 });
        } else {
            await route.abort();
        }
    });

    const goOffline = () => (isOnline = false);
    const goOnline = () => (isOnline = true);

    return { goOnline, goOffline };
};

export default getNetworkControl;
