import { getDataTestId as getParentCategoryDataTestId } from "../../../src/sections/Properties/Create/Content/RHFParentCategory";
import {
    CATEGORY_TESTID,
    getDataTestId as getCategoryDataTestId,
} from "../../../src/sections/Properties/Create/Content/RHFCategory";
import { SAVE_BUTTON_TESTID } from "../../../src/sections/Properties/Create/Content/SaveButton";
import gotoSafe from "../../_util/gotoSafe";
import { Page } from "@playwright/test";

/**
 * Create a property
 * @returns propertyId of a created property
 */
const createProperty = async (page: Page) => {
    await gotoSafe(page, "http://127.0.0.1:3000/property/create");

    // Wait for network idle to ensure all data is loaded
    await page.waitForLoadState("networkidle");

    const parentCategoryTestId = getParentCategoryDataTestId(0);
    const categoryTestId = getCategoryDataTestId(0);

    // Select Parent Category
    await page.getByTestId(parentCategoryTestId).click();

    // Click on Category Select
    await page.getByTestId(CATEGORY_TESTID).click();
    await page.getByTestId(categoryTestId).click();

    // Wait for both the API response and navigation
    const [response] = await Promise.all([
        // Wait for the create property API call
        page.waitForResponse(
            (response) =>
                response.url().includes("/property/create") &&
                response.request().method() === "POST" &&
                response.status() === 200
        ),
        // Click submit button
        page.getByTestId(SAVE_BUTTON_TESTID).click(),
    ]);

    // Get the property ID from the API response
    return await response.json();
};

export default createProperty;
