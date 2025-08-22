import { expect } from "@playwright/experimental-ct-react";
import { Locator, Page } from "@playwright/test";
import drag from "../_util/drag";
import expectGhostOpen from "./ghost/expectOpen";
import expectGhostClosed from "./ghost/expectClose";
import expectPopoverOpen from "./popover/expectOpen";
import expectPopoverClosed from "./popover/expectClosed";

const resizeY = async (
    page: Page,
    ev: Locator,
    offsetY: number,
    eventId: string,
    isCreate: boolean
) => {
    // 1. Get the current bounding box to calculate the bottom position
    const initialBoundingBox = await ev.boundingBox();
    expect(initialBoundingBox).toBeTruthy();

    // 2. Calculate the bottom edge position for mouse down
    const bottomX = initialBoundingBox!.x + initialBoundingBox!.width / 2; // center horizontally
    const bottomY = initialBoundingBox!.y + initialBoundingBox!.height - 2; // 2px from bottom edge

    // 3. Ghost & Popover callbacks
    const onStart = async () => {
        // if (!isCreate) await expectGhostOpen(page, eventId);
        // await expectPopoverOpen(page, eventId);
    };
    const onEnd = async () => {
        if (!isCreate) await expectGhostClosed(page, eventId);
        await expectPopoverClosed(page, eventId);
    };

    await drag(
        page,
        { x: bottomX, y: bottomY },
        { x: bottomX, y: bottomY + offsetY },
        { onStart, onEnd }
    );
};

export default resizeY;
