import { expect } from "@playwright/experimental-ct-react";
import { Page } from "@playwright/test";

/**
 * Get a cell's width
 * @param cellId a cell's id (all of them should have the same width though!)
 */
const getCellWidth = async (page: Page, cellId: string) => {
    const cellElement = page.getByTestId(cellId);
    const cellBoundingBox = await cellElement.boundingBox();
    expect(cellBoundingBox).toBeTruthy();
    return cellBoundingBox!.width;
};

export default getCellWidth;
