import { Page } from "@playwright/test";

// Use the EXACT URL from your hook's fetch call
const PING_URL = "https://www.google.com";

const getNetworkControl = async (page: Page) => {
    let isOnline = true;

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
