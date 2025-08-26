import { Page } from "@playwright/test";

const gotoSafe = async (page: Page, url: string) => {
    await page.goto(url, { waitUntil: "networkidle", timeout: 2 * 60 * 1000 });
};

export default gotoSafe;
