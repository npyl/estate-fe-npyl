import fillAndExpect from "../../_util/fillAndExpect";
import {
    EMAIL_ID,
    PSSWD_ID,
    SUBMIT_ID,
} from "../../../src/sections/Login/constants";
import { DASHBOARD_ID } from "../../../src/sections/dashboard/constants";
import { getLocalCredentials } from "../../_util/getCredentials";
import { Page } from "@playwright/test";

const SEARCH_DEEPER = true;

/**
 * This method does the following:
 *  - Clear LocalStorage to force manual login,
 *  - Fill-in login page's form
 *  - Check whether dashboard loaded (successfull login)
 */
const login = async (page: Page) => {
    // Clear localStorage to force manual login
    await page.evaluate(() => {
        localStorage.clear();
    });

    // Reload to ensure the cleared state takes effect
    await page.reload();

    const { username, password } = getLocalCredentials();

    await fillAndExpect(page, EMAIL_ID, username, SEARCH_DEEPER);
    await fillAndExpect(page, PSSWD_ID, password, SEARCH_DEEPER);

    await page.getByTestId(SUBMIT_ID).click();

    await page.getByTestId(DASHBOARD_ID).waitFor({
        state: "visible",
        timeout: 2 * 60 * 1000,
    });
};

export default login;
