import { Page } from "@playwright/test";
import { tokenKey } from "../../src/constants";

const getToken = (page: Page) =>
    page.evaluate((key) => localStorage.getItem(key), tokenKey);

export default getToken;
