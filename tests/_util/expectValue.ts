import { expect, MountResult } from "@playwright/experimental-ct-react";
import { Page } from "@playwright/test";

const expectValue = async (
    component: MountResult | Page,
    ID: string,
    VALUE: string,
    timeout?: number
) => {
    const locator = component.getByTestId(ID);
    await locator.isVisible({ timeout });
    await expect(locator).toHaveText(VALUE, { timeout });
};

export default expectValue;
