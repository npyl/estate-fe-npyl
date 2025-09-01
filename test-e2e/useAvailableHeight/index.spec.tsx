import { expect, MountResult, test } from "@playwright/experimental-ct-react";
import Tester from "./index.comp";
import {
    BIG_BOX_STYLE,
    BUTTON_ID,
    SMALL_BOX_STYLE,
    TARGET_ID,
    // ...
    WidthHeight,
} from "./index.comp";
import { FALLBACK_OFFSET } from "../../src/hooks/useAvailableHeight";

const DELAY = 2 * 60 * 1000;

const clickButton = async (component: MountResult) => {
    await component.getByTestId(BUTTON_ID).click();
};

const expectDimentions = async (component: MountResult, height: number) => {
    const targetElement = component.getByTestId(TARGET_ID);
    const boundingBox = await targetElement.boundingBox();
    expect(boundingBox?.height).toBe(height);
};

const getExpectedHeight = (BOX_STYLE: WidthHeight) =>
    BOX_STYLE.height - FALLBACK_OFFSET;

test.describe("useAvailableHeight", () => {
    test.setTimeout(DELAY);

    test("initial", async ({ mount }) => {
        const component = await mount(<Tester />);

        // Expect
        const height = getExpectedHeight(SMALL_BOX_STYLE);
        await expectDimentions(component, height);
    });

    test("resize", async ({ mount }) => {
        const component = await mount(<Tester />);
        await clickButton(component);

        // Expect
        const height = getExpectedHeight(BIG_BOX_STYLE);
        await expectDimentions(component, height);
    });
});
