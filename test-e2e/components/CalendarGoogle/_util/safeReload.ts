import { Page } from "@playwright/test";

const safeReload = async (page: Page, timeout?: number) => {
    await page.reload();
    await page.waitForLoadState("networkidle", { timeout });
};

export default safeReload;
