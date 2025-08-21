import { expect } from "@playwright/experimental-ct-react";
import { Locator } from "@playwright/test";

/**
 * Get a cell's width
 * @param cellId a cell's id (all of them should have the same width though!)
 */
const getCellWidth = async (cell: Locator) => {
    const cellBoundingBox = await cell.boundingBox();
    expect(cellBoundingBox).toBeTruthy();
    return cellBoundingBox!.width;
};

export default getCellWidth;
