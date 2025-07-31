import { Page } from "@playwright/test"; // Regular Playwright, not component testing
import { MAP_ID } from "../../../src/components/Map/constants";

type TPoint = { x: number; y: number };

const addPoint = async (page: Page, position: TPoint) => {
    await page.getByTestId(MAP_ID).click({
        position,
        delay: 1000,
    });
};

const makeShape = async (
    page: Page,
    SHAPE_BTN_ID: string,
    points: TPoint[]
) => {
    await page.getByTestId(SHAPE_BTN_ID).click();

    for (let i = 0; i < points.length; i++) {
        const p = points.at(i);
        if (!p) continue;
        await addPoint(page, p);
    }
};

export type { TPoint };
export { makeShape };
