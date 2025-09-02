import { Browser, chromium, Page, test } from "@playwright/test";
import createProperty from "./_util/create";
import expectUrl from "./_util/expectUrl";
import _fillAndExpect from "../_util/fillAndExpect";
import getToken from "../_util/getToken";
import uuidv4 from "../../src/utils/uuidv4";
import { PROPERTY } from "../../src/constants/test";
import { IGlobal } from "../../src/types/global";
import clickOptions from "../_util/select/clickOptions";
import { getOptionTestId } from "../../src/components/hook-form/Select/constants";

// ----------------------------------------------------------------------------

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/global`;

const getGlobals = async (page: Page): Promise<IGlobal | undefined> => {
    try {
        const token = await getToken(page);
        if (!token) throw "Could not receive token";

        const res = await fetch(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (ex) {
        console.log(ex);
    }
};

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
};

const fillInFields = async (page: Page) => {
    // Code
    const code = uuidv4();
    await fillAndExpect(page, PROPERTY.CODE_ID, code);

    // State
    await selectStateOption(page);
};

let browser: Browser;
let page: Page;

// INFO: for ever test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await browser?.close();
});

test.describe("edit", () => {
    test("basic", async () => {
        test.setTimeout(5 * 60 * 1000);

        // Create property & await redirect to edit
        const propertyId = await createProperty(page);
        await expectUrl(page, propertyId);

        // Fill-in fields
        await fillInFields(page);

        // Debug: Check if button exists and get its properties
        await page.getByTestId(PROPERTY.SUBMIT_ID).click();
    });
});
