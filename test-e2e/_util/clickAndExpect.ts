import { MountResult } from "@playwright/experimental-ct-react";
import expectValue from "./expectValue";
import { Page } from "@playwright/test";

/**
 * Click a button & Expect a specific value on a div
 * @param clickId
 * @param valueId
 * @param expected
 */
const clickAndExpect = async (
    component: MountResult | Page,
    // ...
    clickId: string,
    valueId: string,
    expected: string
) => {
    await component.getByTestId(clickId).click();
    await expectValue(component, valueId, expected);
};

export default clickAndExpect;
