import { Page } from "@playwright/test";
import { accessTokenKey } from "../../src/constants";

const getToken = (page: Page) =>
    page.evaluate((key) => localStorage.getItem(key), accessTokenKey);

export default getToken;
