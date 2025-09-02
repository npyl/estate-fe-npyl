import { expect, Page, test } from "@playwright/test";
import createProperty from "./_util/create";
import _fillAndExpect from "../_util/fillAndExpect";
import uuidv4 from "../../src/utils/uuidv4";
import { PROPERTY } from "../../src/constants/test";
import { IProperties } from "../../src/types/properties";
import clickOptions from "../_util/select/clickOptions";
import { getOptionTestId } from "../../src/components/hook-form/Select/constants";
import getGlobals from "../_service/getGlobals";

// ----------------------------------------------------------------------------

const getStateEnumFirstEntry = async (page: Page) => {
    const globals = await getGlobals(page);
    const { property } = globals ?? {};
    const { state } = property ?? {};
    const { key } = state?.at(0) ?? {};
    if (!key) throw "Could not get state enum entry";
    return key;
};

// ----------------------------------------------------------------------------

const DEEPER = true;

const fillAndExpect = (page: Page, FIELD_ID: string, value: string) =>
    _fillAndExpect(page, FIELD_ID, value, DEEPER);

// ----------------------------------------------------------------------------

const selectStateOption = async (page: Page) => {
    const key = await getStateEnumFirstEntry(page);
    const SELECT_ID = getOptionTestId(key);
    await clickOptions(page, PROPERTY.STATE_ID, [SELECT_ID]);
    return key;
};

const fillInFields = async (page: Page) => {
    // Code
    const code = uuidv4();
    await fillAndExpect(page, PROPERTY.CODE_ID, code);

    // State
    const state = await selectStateOption(page);

    return { code, state };
};

const submitAndInterceptRequest = async (page: Page) => {
    const [request] = await Promise.all([
        page.waitForRequest(
            (req) =>
                req.url().includes("/api/properties") && req.method() === "PUT"
        ),

        page.getByTestId(PROPERTY.SUBMIT_ID).click(),
    ]);

    return request.postDataJSON() as IProperties;
};

test.describe("edit", () => {
    test("basic", async ({ page }) => {
        test.setTimeout(5 * 60 * 1000);

        // Create property & await redirect to edit
        await createProperty(page);

        // Fill-in fields
        const { code, state } = await fillInFields(page);

        // Debug: Check if button exists and get its properties
        const request = await submitAndInterceptRequest(page);
        expect(request.code).toBe(code);
        expect(request.state).toBe(state);
    });
});
