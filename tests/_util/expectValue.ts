import { expect, MountResult } from "@playwright/experimental-ct-react";

const expectValue = async (
    component: MountResult,
    ID: string,
    VALUE: string,
    timeout?: number
) => {
    const valueLocator = component.getByTestId(ID);
    await expect(valueLocator).toHaveText(VALUE, { timeout });
};

export default expectValue;
