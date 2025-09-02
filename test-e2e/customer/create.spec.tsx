import { Browser, chromium, Page, test } from "@playwright/test";
import gotoSafe from "../_util/gotoSafe";
import {
    FIRSTNAME_ID,
    LASTNAME_ID,
    EMAIL_ID,
    // ..
    BUYER_CHECKBOX_ID,
    // ..
    DEMANDS_BUTTON_ID,
    DEMAND_FORM_ID,
    DEMAND_SAVE_BUTTON_ID,
    // ...
    CUSTOMER_SUBMIT_ID,
} from "../../src/sections/Customer/Form/constants";
import fillAndExpect from "../_util/fillAndExpect";
import { CIRCLE_ID } from "../../src/components/Map/plugins/Draw";
import { MAP_ID } from "../../src/components/Map/constants";
import expectUrl from "../_util/expectUrl";

const SEARCH_DEEPER = true;

const baseUrl = "http://127.0.0.1:3000/customer/create";

let browser: Browser;
let page: Page;

// INFO: for ever test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await gotoSafe(page, baseUrl);
});

test.afterAll(async () => {
    await browser?.close();
});

/**
 * Tests Create sequence & visibility of some core elements
 */
test("create", async () => {
    test.setTimeout(5 * 60 * 1000);

    await fillAndExpect(page, FIRSTNAME_ID, "Tester", SEARCH_DEEPER);
    await fillAndExpect(page, LASTNAME_ID, "Testoglou", SEARCH_DEEPER);
    await fillAndExpect(
        page,
        EMAIL_ID,
        "propertypro-crm-tester@digipath.gr",
        SEARCH_DEEPER
    );

    // Click Buyer checkbox
    await page.getByTestId(BUYER_CHECKBOX_ID).click();

    // Click demands button
    await page.getByTestId(DEMANDS_BUTTON_ID).click({ timeout: 2 * 60 * 1000 });

    // ---------------------------------------------------------------------------------
    // Demands
    // ---------------------------------------------------------------------------------

    const form = page.getByTestId(DEMAND_FORM_ID);
    const map = page.getByTestId(MAP_ID);

    // INFO: scroll to view to trigger load because map loads as dynamic import
    await form.waitFor({ state: "visible", timeout: 2 * 60 * 1000 });
    await map.scrollIntoViewIfNeeded();
    await map.waitFor({ state: "visible", timeout: 2 * 60 * 1000 });

    // Map has draw
    await page
        .getByTestId(CIRCLE_ID)
        .waitFor({ state: "visible", timeout: 2 * 60 * 1000 });

    // Save demands
    await page.getByTestId(DEMAND_SAVE_BUTTON_ID).click();

    // Wait for both the API response and navigation
    const [response] = await Promise.all([
        // Wait for the create property API call
        page.waitForResponse(
            (response) =>
                response.url().includes("/customers") &&
                response.request().method() === "POST" &&
                response.status() === 200
        ),
        // Click submit button
        page.getByTestId(CUSTOMER_SUBMIT_ID).click(),
    ]);

    // Get the property ID from the API response
    const responseData = await response.json();
    const customerId = responseData;

    const expectedUrl = `http://127.0.0.1:3000/customer/${customerId}`;

    await expectUrl(page, expectedUrl);
});
