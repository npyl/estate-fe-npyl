import { test, expect } from "@playwright/test";
import { baseUrl } from "./constants";
import { getState } from "./util";
import gotoSafe from "../_util/gotoSafe";

const ASSIGNEE_ID = 456;

test("URL overrides", async ({ page }) => {
    test.setTimeout(2 * 60 * 1000);

    // Navigate with assignee query param
    await gotoSafe(page, `${baseUrl}?assignee=${ASSIGNEE_ID}`);

    const state = await getState(page);
    expect(state.assigneeId).toBe(ASSIGNEE_ID);
});
