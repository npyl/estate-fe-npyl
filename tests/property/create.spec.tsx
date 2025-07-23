import { expect, test } from "@playwright/test";
import { getDataTestId as getParentCategoryDataTestId } from "../../src/sections/Properties/Create/Content/RHFParentCategory";
import {
    CATEGORY_TESTID,
    getDataTestId as getCategoryDataTestId,
} from "../../src/sections/Properties/Create/Content/RHFCategory";
import { SAVE_BUTTON_TESTID } from "../../src/sections/Properties/Create/Content/SaveButton";
import { TTestCb } from "../_types";
import gotoSafe from "../_util/gotoSafe";

test.beforeEach(async ({ page }) => {
    await gotoSafe(page, "http://127.0.0.1:3000/property/create");
});

const create = async ({ page }: TTestCb) => {
    test.setTimeout(5 * 60 * 1000);

    const parentCategoryTestId = getParentCategoryDataTestId(0);
    const categoryTestId = getCategoryDataTestId(0);

    // Wait for network idle to ensure all data is loaded
    await page.waitForLoadState("networkidle");

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
    const responseData = await response.json();
    const propertyId = responseData;

    const expectedUrl = `http://127.0.0.1:3000/property/edit/${propertyId}`;

    // Poll for the correct URL
    await expect(async () => {
        expect(page.url()).toBe(expectedUrl);
    }).toPass({ timeout: 2 * 60 * 1000 });

    // Additional verification that page is loaded
    await expect(page).toHaveURL(expectedUrl);
};

test.describe("property-basics", () => {
    test("create", create);
});
