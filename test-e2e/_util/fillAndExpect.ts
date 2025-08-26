import { expect, Page } from "@playwright/test";

/**
 * Fill an input element with a value & check if value was written
 * @param FIELD_ID
 * @param value
 * @param searchDeeper
 */
const fillAndExpect = async (
    page: Page,
    FIELD_ID: string,
    value: string,
    searchDeeper: boolean = false
) => {
    let locator = page.getByTestId(FIELD_ID);

    // INFO: in some cases (e.g. MUI's TextField) the input may be sub-element; so search for it
    if (searchDeeper) locator = locator.locator("input");

    await locator.fill(value);

    // INFO: this is immediate; whereas expect(locator).toHave() is not!
    const immediateValue = await locator.inputValue();
    expect(immediateValue).toBe(value);
};

export default fillAndExpect;
