import { Page } from "playwright-core";

const clickAutocompleteOptions = async (
    page: Page,
    AUTOCOMPLETE_ID: string,
    OPTION_IDs: string[],
    chained: boolean = true
) => {
    // Close any open dropdown first
    if (chained) {
        await page.keyboard.press("Escape");
        await page.waitForTimeout(100); // Small delay to ensure dropdown closes
    }

    // Click on the autocomplete input field
    await page
        .getByTestId(AUTOCOMPLETE_ID)
        .locator(".MuiAutocomplete-input")
        .click();

    // Wait for the dropdown/listbox to appear
    await page.locator('[role="listbox"]').waitFor();

    // Click on each option
    for (const OPTION_ID of OPTION_IDs) {
        await page.getByTestId(OPTION_ID).click();
    }
};

export default clickAutocompleteOptions;
