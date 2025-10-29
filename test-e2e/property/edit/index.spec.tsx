import { Browser, chromium, expect, Page, test } from "@playwright/test";
import { PROPERTY } from "../../../src/constants/tests";
import { IProperties, IPropertiesPOST } from "../../../src/types/properties";
import basicEdit from "./basicEdit";
import { ADD_BALCONY_BUTTON_TESTID } from "../../../src/sections/Properties/Edit/Form/forms/_general/Balconies/constants";
import { ADD_PARKING_BUTTON_TESTID } from "../../../src/sections/Properties/Edit/Form/forms/_general/Parking/constants";
import { RHF_ERRORS_TESTID } from "../../../src/sections/Properties/Edit/Form/ErrorWatcher/constants";
import JSONParseSafe from "../../../src/utils/JSONParseSafe";
import { FieldErrors } from "react-hook-form";

let browser: Browser;
let page: Page;

// INFO: for every test we need to bring up a non-headless browser instance (because the Map cannot load without a view)
test.beforeAll(async () => {
    test.setTimeout(5 * 60 * 1000);
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

test.afterAll(async () => {
    await browser?.close();
});

// -----------------------------------------------------------------------------

const clickSubmit = (page: Page) =>
    page.getByTestId(PROPERTY.SUBMIT_ID).click();

// -----------------------------------------------------------------------------

const submitAndInterceptRequest = async (page: Page) => {
    const [request] = await Promise.all([
        page.waitForRequest(
            (req) =>
                req.url().includes("/api/properties") && req.method() === "PUT"
        ),

        clickSubmit(page),
    ]);

    return request.postDataJSON() as IProperties;
};

const expectSuccessfulSubmit = async (
    page: Page,
    code: string,
    state: string
) => {
    // Debug: Check if button exists and get its properties
    const request = await submitAndInterceptRequest(page);
    expect(request.code).toBe(code);
    expect(request.state).toBe(state);
};

// ---------------------------------------------------------------------

const addParking = (page: Page) =>
    page.getByTestId(ADD_PARKING_BUTTON_TESTID).click();
const selectParkTypeOption = async () => {};
const fillInSpots = async () => {};

const addParkingInComplete = async (
    page: Page,
    missing?: "parkType" | "spots"
) => {
    await addParking(page);
    if (missing !== "parkType") await selectParkTypeOption();
    if (missing !== "spots") await fillInSpots();
};

const addParkingComplete = (page: Page) =>
    addParkingInComplete(page, undefined);

// ---------------------------------------------------------------------

const addBalcony = async (page: Page) =>
    page.getByTestId(ADD_BALCONY_BUTTON_TESTID).click();
const selectSideOption = async () => {};
const fillInArea = async () => {};

const addBalconyInComplete = async (page: Page, missing?: "side" | "area") => {
    await addBalcony(page);
    if (missing !== "side") await selectSideOption();
    if (missing !== "area") await fillInArea();
};

const addBalconyComplete = (page: Page) =>
    addBalconyInComplete(page, undefined);

// ---------------------------------------------------------------------

const getFormErrors = async (page: Page) => {
    const c = await page.getByTestId(RHF_ERRORS_TESTID).textContent();
    expect(c).not.toBe(null);

    const j = JSONParseSafe<FieldErrors<IPropertiesPOST>>(c);
    expect(j).not.toBe(null);

    return j!;
};

// ---------------------------------------------------------------------

test.describe("edit", () => {
    test("basic", async ({ page }) => {
        const { code, state } = await basicEdit(page);
        await expectSuccessfulSubmit(page, code, state);
    });

    test.describe("balconies & parkings", () => {
        test.describe("balconies", () => {
            test.describe("1", () => {
                test("complete", async () => {
                    await basicEdit(page);
                    await addBalconyComplete(page);
                    await clickSubmit(page);

                    const j = await getFormErrors(page);
                    const b = j.details?.balconies ?? [];
                    expect(b?.length).toBe(1);
                    const b0 = b?.at(0) as any;
                    console.log("b0: ", b0);
                    expect(b0?.parkingType).toBe("");
                    expect(b0?.spots).toBe("");

                    // await page.waitForTimeout(100000);
                });
                test("in-complete (no side)", async ({ page }) => {
                    await basicEdit(page);
                    await addBalconyInComplete(page, "side");
                });
                test("in-complete (no area)", async ({ page }) => {
                    await basicEdit(page);
                    await addBalconyInComplete(page, "area");
                });
            });

            test.describe("1+", () => {
                test("complete", async ({ page }) => {
                    await basicEdit(page);
                    await addBalconyComplete(page);
                    await addBalconyInComplete(page);
                });
                test("in-complete (no side)", async ({ page }) => {
                    await basicEdit(page);
                    await addBalconyComplete(page);
                    await addBalconyInComplete(page, "side");
                });
                test("in-complete (no area)", async ({ page }) => {
                    await basicEdit(page);
                    await addBalconyComplete(page);
                    await addBalconyInComplete(page, "area");
                });
            });
        });

        test.describe("parkings", () => {
            test.describe("1", () => {
                test("complete", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingComplete(page);
                });
                test("in-complete (no parkType)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingInComplete(page, "parkType");
                });
                test("in-complete (no spots)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingInComplete(page, "spots");
                });
            });

            test.describe("1+", () => {
                test("complete", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingComplete(page);
                    await addParkingComplete(page);
                });
                test("in-complete (no parkType)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingInComplete(page, "parkType");
                });
                test("in-complete (no spots)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingInComplete(page, "spots");
                });
            });
        });
    });
});
