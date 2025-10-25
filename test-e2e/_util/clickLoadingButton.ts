import { Page } from "@playwright/test";

const clickLoadingButton = async (page: Page, BUTTON_TESTID: string) => {
    const submitButton = page.getByTestId(BUTTON_TESTID);

    // Wait for button to be visible and enabled
    await submitButton.waitFor({ state: "visible" });

    // Wait for MUI's loading spinner/overlay to disappear
    // The LoadingButton wraps content in a span with loading classes
    await page.waitForFunction(
        (testId) => {
            const button = document.querySelector(`[data-testid="${testId}"]`);
            if (!button) return false;

            // Check if button has loading class
            const hasLoadingClass = button.className.includes(
                "MuiLoadingButton-loading"
            );

            // Check if disabled
            const isDisabled = button.hasAttribute("disabled");

            return !hasLoadingClass && !isDisabled;
        },
        BUTTON_TESTID,
        { timeout: 10000 }
    );

    // Submit
    await submitButton.click();
};

export default clickLoadingButton;
