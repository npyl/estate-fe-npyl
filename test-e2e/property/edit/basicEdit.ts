import { Page, test } from "@playwright/test";
import createProperty from "./../_util/create";
import uuidv4 from "../../../src/utils/uuidv4";
import { PROPERTY } from "../../../src/constants/tests";
import clickOptions from "../../_util/select/clickOptions";
import { getOptionTestId } from "../../../src/components/hook-form/Select/constants";
import getGlobals from "../../_service/getGlobals";
import fillAndExpect from "./fillAndExpect";

// ------------------------------------------------------------------------------

const getStateEnumFirstEntry = async (page: Page) => {
    const globals = await getGlobals(page);
    const { property } = globals ?? {};
    const { state } = property ?? {};
    const { key } = state?.at(0) ?? {};
    if (!key) throw new Error("Could not get state enum entry");
    return key;
};

const selectStateOption = async (page: Page) => {
    const key = await getStateEnumFirstEntry(page);
    const SELECT_ID = getOptionTestId(key);
    await clickOptions(page, PROPERTY.STATE_ID, [SELECT_ID]);
    return key;
};

// ------------------------------------------------------------------------------

const fillInFields = async (page: Page) => {
    // Code
    const code = uuidv4();
    await fillAndExpect(page, PROPERTY.CODE_ID, code);

    // State
    const state = await selectStateOption(page);

    return { code, state };
};

// -------------------------------------------------------------------------------

const basicEdit = async (page: Page) => {
    test.setTimeout(5 * 60 * 1000);

    // Create property & await redirect to edit
    await createProperty(page);

    // Fill-in fields
    return await fillInFields(page);
};

export default basicEdit;
