import { expect, Page } from "@playwright/test";

const fillAndExpect = async (page: Page, FIELD_ID: string, value: string) => {
    const locator = page.getByTestId(FIELD_ID);
    await locator.fill(value);

    // INFO: this is immediate; whereas expect(locator).toHave() is not!
    const immediateValue = await locator.inputValue();
    expect(immediateValue).toBe(value);
};

export default fillAndExpect;
