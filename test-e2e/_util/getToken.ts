import { Page } from "@playwright/test";
import { getAccessToken } from "../../src/contexts/accessToken";

const getToken = (page: Page) => page.evaluate(() => getAccessToken());

export default getToken;
