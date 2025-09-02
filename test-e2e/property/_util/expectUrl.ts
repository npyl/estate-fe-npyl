import { expect, Page } from "@playwright/test";

const expectUrl = async (page: Page, propertyId: number) => {
    const expectedUrl = `http://127.0.0.1:3000/property/edit/${propertyId}`;

    // Additional verification that page is loaded
    await expect(page).toHaveURL(expectedUrl, { timeout: 2 * 60 * 1000 });
};

export default expectUrl;
