import { expect } from "@playwright/experimental-ct-react";
import { Locator, Page } from "@playwright/test";
import drag from "../_util/drag";
import getCellWidth from "../_util/getCellWidth";
import getCallbacks from "./getCallbacks";

interface DragStats {
    initialX: number;
    initialY: number;
    cellWidth: number;
}

const dragToNextCell = async (
    page: Page,
    // ...
    event: Locator,
    eventId: string,
    // ...
    cell: Locator
): Promise<DragStats> => {
    // 1. Store initial position before drag
    const initialBoundingBox = await event.boundingBox();
    expect(initialBoundingBox).toBeTruthy();
    const initialX = initialBoundingBox!.x;
    const initialY = initialBoundingBox!.y;
    const centerX = initialX + initialBoundingBox!.width / 2;
    const centerY = initialY + initialBoundingBox!.height / 2;

    // 2. calculate dragOffset and cellWidth
    const cellWidth = await getCellWidth(cell);

    // 3. Ghost & Popover callbacks
    const callbacks = getCallbacks(page, eventId);

    // 4. perform horizontal drag (just enough to trigger a snap to neighbouring cell on the right)
    await drag(
        page,
        { x: centerX, y: centerY },
        { x: centerX + cellWidth, y: centerY },
        callbacks
    );

    return { initialX, initialY, cellWidth };
};

const expectOnNextCell = async (event: Locator, dragStats: DragStats) => {
    const { initialX, initialY, cellWidth } = dragStats;

    // 5. Verify final position
    const finalBoundingBox = await event.boundingBox();
    expect(finalBoundingBox).toBeTruthy();
    const finalX = finalBoundingBox!.x;
    const finalY = finalBoundingBox!.y;

    // 6. X position should move by exactly one cell width to the right
    expect(finalX).toBe(initialX + cellWidth);

    // 7. Y position should remain the same
    expect(finalY).toBe(initialY);
};

export { dragToNextCell, expectOnNextCell };
