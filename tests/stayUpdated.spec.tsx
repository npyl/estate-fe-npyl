import { test, expect, Page } from "@playwright/test";
import {
    VIEW_BY_ID_TEST_ID,
    FILTERS_TEST_ID,
    SHAPELIST_TEST_ID,
} from "../src/pages/__test__/stayUpdated.page";

const SHAPE = JSON.stringify([
    { x: 38.2704, y: 21.7749 },
    { x: 15760.4346, y: null },
]);

const FILTERS = {
    states: ["SALE"],
    parentCategories: ["RESIDENTIAL"],
    categories: ["APARTMENT"],
    extras: ["luxury"],
    minPrice: 10000,
    maxPrice: 510000,
};

const getFilters = () => {
    // Create an object to hold all parameters
    const filterParams = new URLSearchParams();
    filterParams.append("states", FILTERS.states.toString());
    filterParams.append(
        "parentCategories",
        FILTERS.parentCategories.toString()
    );
    filterParams.append("categories", FILTERS.categories.toString());
    filterParams.append("extras", FILTERS.extras.toString());
    filterParams.append("minPrice", FILTERS.minPrice.toString());
    filterParams.append("maxPrice", FILTERS.maxPrice.toString());
    return filterParams.toString();
};

const getPublicUrl = () => {
    const points = encodeURIComponent(SHAPE);
    const filters = getFilters();

    // const baseUrl = "http://localhost:3001/en/properties";
    const baseUrl = "https://kopanitsanos.gr/en/properties";

    return `${baseUrl}?${filters}&points=${points}`;
};

const publicUrl = getPublicUrl();
const crmUrl = "http://127.0.0.1:3000/__test__/stayUpdated";

// ---------------------------------- START -------------------------------------------
// IMPORTANT: the following constants defined in PUBLIC aswell so make sure to update in both places
const STAY_UPDATED_TEST_ID = "StayUpdatedTestId"; // Opens modal
const FIRSTNAME_TEST_ID = "FirstnameTestId";
const LASTNAME_TEST_ID = "LastnameTestId";
const MOBILEPHONE_TEST_ID = "MobilePhoneTestId";
const EMAIL_TEST_ID = "EmailTestId";
const SAVE_BUTTON_TEST_ID = "SaveButtonTestId";
const MODAL_TEST_ID = "ModalTestId";
// ---------------------------------- END ---------------------------------------------

const VALUES = {
    firstName: "John",
    lastName: "Doe",
    email: "propertypro-crm-tester@digipath.gr",
    mobilePhone: "6912345678",
};

const expectFilter = ([key, value]: [any, any]) => {
    if (Array.isArray(FILTERS[key]) && Array.isArray(value)) {
        // For arrays, check that all elements match
        expect(value).toEqual(expect.arrayContaining(FILTERS[key]));
        expect(FILTERS[key]).toEqual(expect.arrayContaining(value));
        expect(value.length).toBe(FILTERS[key].length);
    } else {
        // For non-array values, use direct comparison
        expect(value).toBe(FILTERS[key]);
    }
};

const expectFilters = async (content: string) => {
    Object.entries(JSON.parse(content)).forEach(expectFilter);
};

const fillAndExpect = async (page: Page, FIELD_ID: string, value: string) => {
    await page.getByTestId(FIELD_ID).fill(value);
    await expect(page.getByTestId(FIELD_ID)).toHaveValue(value);
};

/**
 * This should test whether filters applied from public are passed correctly to CRM
 */
test("Filters", async ({ page }) => {
    //
    //  Public
    //
    await page.goto(publicUrl);

    // Open Modal
    await page.getByTestId(STAY_UPDATED_TEST_ID).locator("svg").click();

    // Wait for it to actually open
    await page.getByTestId(MODAL_TEST_ID).waitFor({ state: "visible" });

    // Fill in form
    await fillAndExpect(page, FIRSTNAME_TEST_ID, VALUES.firstName);
    await fillAndExpect(page, LASTNAME_TEST_ID, VALUES.lastName);
    await fillAndExpect(page, MOBILEPHONE_TEST_ID, VALUES.mobilePhone);
    await fillAndExpect(page, EMAIL_TEST_ID, VALUES.email);

    // Submit
    await page.getByTestId(SAVE_BUTTON_TEST_ID).click();

    // Wait for modal to be close which means success
    await expect(page.getByTestId(MODAL_TEST_ID)).toBeHidden({
        timeout: 10 * 1000,
    });

    //
    // Now go to crm's notification page
    //
    await page.goto(crmUrl);
    await page.getByTestId(VIEW_BY_ID_TEST_ID).waitFor({ state: "visible" });
    await expectFilters(await page.getByTestId(FILTERS_TEST_ID).innerHTML());
    await expect(page.getByTestId(SHAPELIST_TEST_ID)).toHaveText(SHAPE);
});
