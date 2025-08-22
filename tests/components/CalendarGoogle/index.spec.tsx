import { test } from "@playwright/experimental-ct-react";
import gotoSafe from "../../_util/gotoSafe";
import {
    EVENT_CLASSNAME,
    getEventTestId,
} from "../../../src/components/Calendar/Event/constants";
import {
    EVENT_POPOVER_SUBMIT_TESTID,
    EVENT_POPOVER_TITLE_TESTID,
} from "../../../src/sections/Calendar/Event/form/constants";
import { CREATE_EVENT_ID } from "../../../src/constants/calendar";
import fillAndExpect from "../../_util/fillAndExpect";
import uuidv4 from "../../../src/utils/uuidv4";
import getEventByClassName from "./_util/getEventByClassName";
import makeEvent from "./makeEvent";
import testBasicFlow from "./testBasicFlow";

// INFO: you need to be already authenticated to google for this test to work

const SEARCH_DEEP = true;

const baseUrl = "http://127.0.0.1:3000/__test__/calendar";

test.beforeEach(async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);
    await gotoSafe(page, baseUrl);
});

test("Event (Create)", async ({ page }) => {
    const { cell } = await makeEvent(page);
    const event = page.getByTestId(getEventTestId(CREATE_EVENT_ID));
    await testBasicFlow(page, event, CREATE_EVENT_ID, cell);
});

test("Event (Existing)", async ({ page }) => {
    const { cell } = await makeEvent(page);

    await fillAndExpect(
        page,
        EVENT_POPOVER_TITLE_TESTID,
        uuidv4(),
        SEARCH_DEEP
    );

    await page.getByTestId(EVENT_POPOVER_SUBMIT_TESTID).click();

    await page.waitForLoadState("networkidle", { timeout: 2 * 60 * 1000 });
    await page.waitForLoadState("domcontentloaded", { timeout: 2 * 60 * 1000 });

    const event = await getEventByClassName(
        cell,
        EVENT_CLASSNAME,
        2 * 60 * 1000
    );

    const eventId = await event.getAttribute("id");
    if (!eventId) throw "Could not find eventId";

    await testBasicFlow(page, event, eventId, cell);
});
