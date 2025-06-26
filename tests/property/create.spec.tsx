import { expect, test } from "@playwright/test";
import { getDataTestId as getParentCategoryDataTestId } from "../../src/sections/Properties/Create/Content/RHFParentCategory";
import {
    CATEGORY_TESTID,
    getDataTestId as getCategoryDataTestId,
} from "../../src/sections/Properties/Create/Content/RHFCategory";
import { SAVE_BUTTON_TESTID } from "../../src/sections/Properties/Create/Content/SaveButton";
import { TTestCb } from "../_types";

test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/property/create");
});

const create = async ({ page }: TTestCb) => {
    const parentCategoryTestId = getParentCategoryDataTestId(0);
    const categoryTestId = getCategoryDataTestId(0);

    // Select Parent Category
    await page.getByTestId(parentCategoryTestId).click();

    // Click on Category Select
    await page.getByTestId(CATEGORY_TESTID).click();
    await page.getByTestId(categoryTestId).click();

    // Click on submit button
    await page.getByTestId(SAVE_BUTTON_TESTID).click();

    // Wait for redirect to edit page
    await page.waitForURL(/\/property\/edit\/.+/, { timeout: 30 * 1000 });

    // Test if we got a valid id on URL
    const url = page.url();
    const propertyId = url.split("/property/edit/")[1];
    expect(parseInt(propertyId)).toBeGreaterThan(0);
};

test.describe("property-basics", () => {
    test("create", create);
});
