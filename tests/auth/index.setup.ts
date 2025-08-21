import test, { Browser, chromium, Page, test as setup } from "@playwright/test";
import prepareLocalAuth from "./prepareLocalAuth";
import prepareGoogleOAuth from "./prepareGoogleOAuth";

let browser: Browser;
let page: Page;

// INFO: for ever test we need to bring up a non-headless browser instance
test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await browser?.close();
});

setup("authenticate", async () => {
    const [accessToken, id] = await prepareLocalAuth(page);
    if (!accessToken) throw "This is really wrong!";
    if (id === -1) throw "This is a bad Id";

    await prepareGoogleOAuth(page, accessToken, id);
});
