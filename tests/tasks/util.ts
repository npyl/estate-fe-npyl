import { Page } from "@playwright/test";
import { CURRENT_STATE_ID } from "./constants";

const getState = async (page: Page) => {
    const updatedState = await page.getByTestId(CURRENT_STATE_ID).textContent();
    if (!updatedState) throw "Could not get state";
    return JSON.parse(updatedState);
};

export { getState };
