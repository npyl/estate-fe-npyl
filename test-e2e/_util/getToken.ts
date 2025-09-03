import { Page } from "@playwright/test";

const getToken = (page: Page) =>
    page.evaluate(() => localStorage.getItem("accessToken"));

export default getToken;
