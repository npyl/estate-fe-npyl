import { expect, MountResult } from "@playwright/experimental-ct-react";

const clickAndExpect = async (
    component: MountResult,
    // ...
    clickId: string,
    valueId: string,
    expected: string
) => {
    await component.getByTestId(clickId).click();
    const valueLocator = component.getByTestId(valueId);
    await expect(valueLocator).toHaveText(expected);
};

export default clickAndExpect;
