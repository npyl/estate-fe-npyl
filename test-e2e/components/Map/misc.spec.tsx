import { Page, test } from "@playwright/test"; // Regular Playwright, not component testing
import { MAP_SEARCH_TESTID } from "../../../src/components/Map/plugins/Search";
import { DRAW_PLUGIN_TESTID } from "../../../src/components/Map/plugins/Draw";
import gotoSafe from "../../_util/gotoSafe";

const baseUrl = "http://127.0.0.1:3000/__test__/map";

const expectControls = async (page: Page) => {
    await page.getByTestId(MAP_SEARCH_TESTID).waitFor({ state: "visible" });
    await page.getByTestId(DRAW_PLUGIN_TESTID).waitFor({ state: "visible" });
};

// INFO: for every test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, baseUrl);
});

test("Controls", async ({ page }) => {
    await expectControls(page);

    // Fire rapid reload events!
    await page.reload();
    await page.reload();
    await page.reload();
    await page.reload();
    await page.reload();

    await expectControls(page);
});
