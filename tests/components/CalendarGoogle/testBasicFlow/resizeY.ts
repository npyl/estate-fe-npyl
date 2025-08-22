import { expect } from "@playwright/experimental-ct-react";
import { Locator, Page } from "@playwright/test";
import drag from "../_util/drag";
import getCallbacks from "./getCallbacks";

const resizeY = async (
    page: Page,
    // ...
    event: Locator,
    eventId: string,
    // ...
    offsetY: number
) => {
    // 1. Get the current bounding box to calculate the bottom position
    const initialBoundingBox = await event.boundingBox();
    expect(initialBoundingBox).toBeTruthy();

    // 2. Calculate the bottom edge position for mouse down
    const bottomX = initialBoundingBox!.x + initialBoundingBox!.width / 2; // center horizontally
    const bottomY = initialBoundingBox!.y + initialBoundingBox!.height - 2; // 2px from bottom edge

    // 3. Ghost & Popover callbacks
    const callbacks = getCallbacks(page, eventId);

    await drag(
        page,
        { x: bottomX, y: bottomY },
        { x: bottomX, y: bottomY + offsetY },
        callbacks
    );
};

export default resizeY;
