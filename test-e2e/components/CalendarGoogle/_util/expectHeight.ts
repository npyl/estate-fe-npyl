import { expect } from "@playwright/experimental-ct-react";
import { Locator } from "@playwright/test";

/**
 * Expect an element to have a specific height (number) in pixels
 * @param el an element
 * @param height expected height (px) for this element
 */
const expectHeight = async (el: Locator, height: number) => {
    const EXPECTED_HEIGHT = `${height}px`;
    await expect(el).toHaveCSS("height", EXPECTED_HEIGHT);
};

export default expectHeight;
