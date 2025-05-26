import { expect, MountResult } from "@playwright/experimental-ct-react";

const expectValue = async (
    component: MountResult,
    ID: string,
    VALUE: string
) => {
    const valueLocator = component.getByTestId(ID);
    await expect(valueLocator).toHaveText(VALUE);
};

export default expectValue;
