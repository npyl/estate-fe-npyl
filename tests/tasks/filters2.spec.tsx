import { test, expect } from "@playwright/test";
import { baseUrl } from "./constants";
import { getState } from "./util";

const ASSIGNEE_ID = 456;

test("URL overrides", async ({ page }) => {
    // Navigate with assignee query param
    await page.goto(`${baseUrl}?assignee=${ASSIGNEE_ID}`);

    const state = await getState(page);
    expect(state.assigneeId).toBe(ASSIGNEE_ID);
});
