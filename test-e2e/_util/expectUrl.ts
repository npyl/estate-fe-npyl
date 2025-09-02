import { expect, Page } from "@playwright/test";

const expectUrl = async (
    page: Page,
    url: string,
    timeout: number = 2 * 60 * 1000
) => expect(page).toHaveURL(url, { timeout });

export default expectUrl;
