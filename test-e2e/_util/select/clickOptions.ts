import { Page } from "playwright-core";

const clickOptions = async (
    page: Page,
    SELECT_ID: string,
    OPTION_IDs: string[]
) => {
    // Close any open dropdown first
    await page.keyboard.press("Escape");
    await page.waitForTimeout(100); // Small delay to ensure dropdown closes

    await page.getByTestId(SELECT_ID).locator(".MuiSelect-select").click();
    await page.locator('[role="listbox"]').waitFor(); // wait for popover to appear

    for (const OPTION_ID of OPTION_IDs) {
        await page.getByTestId(OPTION_ID).click();
    }
};

export default clickOptions;
