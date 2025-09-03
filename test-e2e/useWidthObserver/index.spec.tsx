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

const DELAY = 2 * 60 * 1000;

const clickButton = async (component: MountResult) => {
    await component.getByTestId(BUTTON_ID).click();
};

const expectDimentions = async (component: MountResult, width: number) => {
    const targetElement = component.getByTestId(TARGET_ID);
    const boundingBox = await targetElement.boundingBox();
    expect(boundingBox?.width).toBe(width);
};

const getExpectedWidth = (BOX_STYLE: WidthHeight) => BOX_STYLE.width;

test.describe("useWidthObserver", () => {
    test.setTimeout(DELAY);

    test("initial", async ({ mount }) => {
        const component = await mount(<Tester />);

        // Expect
        const width = getExpectedWidth(SMALL_BOX_STYLE);
        await expectDimentions(component, width);
    });

    test("resize", async ({ mount }) => {
        const component = await mount(<Tester />);
        await clickButton(component);

        // Expect
        const width = getExpectedWidth(BIG_BOX_STYLE);
        await expectDimentions(component, width);
    });
});
