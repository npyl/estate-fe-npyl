import { test, expect, Page } from "@playwright/test";

// const baseUrl = "https://kopanitsanos.gr/en/properties";
const baseUrl = "http://127.0.0.1:3001/en/properties";
const filters = `?states=SALE&parentCategories=RESIDENTIAL&categories=APARTMENT&extras=luxury&minPrice=10000&maxPrice=510000&points=%5B%7B"x"%3A38.2704%2C"y"%3A21.7749%7D%2C%7B"x"%3A15760.4346%2C"y"%3Anull%7D%5D`;
const publicUrl = `${baseUrl}${filters}`;

// Opens modal
const STAY_UPDATED_TEST_ID = "StayUpdatedTestId";

// Inside modal
const FIRSTNAME_TEST_ID = "FirstnameTestId";
const LASTNAME_TEST_ID = "LastnameTestId";
const MOBILEPHONE_TEST_ID = "MobilePhoneTestId";
const EMAIL_TEST_ID = "EmailTestId";
const SAVE_BUTTON_TEST_ID = "SaveButtonTestId";

const MODAL_TEST_ID = "ModalTestId";

const VALUES = {
    firstName: "John",
    lastName: "Doe",
    email: "propertypro-crm-tester@digipath.gr",
    mobilePhone: "6912345678",
};

const fillAndExpect = async (page: Page, FIELD_ID: string, value: string) => {
    await page.getByTestId(FIELD_ID).fill(value);
    await expect(page.getByTestId(FIELD_ID)).toHaveValue(value);
};

/**
 * This should test whether filters applied from public are passed correctly to CRM
 */
test("Filters", async ({ page }) => {
    await page.goto(publicUrl);

    // Open Modal
    await page.getByTestId(STAY_UPDATED_TEST_ID).click();

    // Fill in form
    await fillAndExpect(page, FIRSTNAME_TEST_ID, VALUES.firstName);
    await fillAndExpect(page, LASTNAME_TEST_ID, VALUES.lastName);
    await fillAndExpect(page, MOBILEPHONE_TEST_ID, VALUES.mobilePhone);
    await fillAndExpect(page, EMAIL_TEST_ID, VALUES.email);

    // Submit
    await page.getByTestId(SAVE_BUTTON_TEST_ID).click();

    // Wait for modal to be close which means success
    await expect(page.getByTestId(MODAL_TEST_ID)).toBeHidden({
        timeout: 10000,
    });
});
