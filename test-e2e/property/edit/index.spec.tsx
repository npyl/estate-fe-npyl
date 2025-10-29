import { expect, Page, test } from "@playwright/test";
import { PROPERTY } from "../../../src/constants/tests";
import { IProperties, IPropertiesPOST } from "../../../src/types/properties";
import basicEdit from "./basicEdit";
import {
    ADD_BALCONY_BUTTON_TESTID,
    getAreaTestId,
    getBalconySideTestId,
} from "../../../src/sections/Properties/Edit/Form/forms/_general/Balconies/constants";
import {
    ADD_PARKING_BUTTON_TESTID,
    getParkingTypeSelectTestId,
    getSpotsTestId,
} from "../../../src/sections/Properties/Edit/Form/forms/_general/Parking/constants";
import { RHF_ERRORS_TESTID } from "../../../src/sections/Properties/Edit/Form/ErrorWatcher/constants";
import JSONParseSafe from "../../../src/utils/JSONParseSafe";
import { FieldErrors } from "react-hook-form";
import fillAndExpect from "./fillAndExpect";
import clickOptions from "../../_util/select/clickOptions";
import getGlobals from "../../_service/getGlobals";
import { getOptionTestId } from "../../../src/components/hook-form/Select/constants";

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

const selectParkingTypeOption = async (page: Page, index: number) => {
    const data = await getGlobals(page);
    const parkingType = data?.property?.details?.parkingType;
    const key = parkingType?.at(0)?.key || "";
    expect(key).not.toBe("");
    const TESTID = getOptionTestId(key);
    await clickOptions(
        page,
        getParkingTypeSelectTestId(index),
        [TESTID],
        false
    );
};
const fillInSpots = (page: Page, index: number) =>
    fillAndExpect(page, getSpotsTestId(index), "123");

const addParkingInComplete = async (
    page: Page,
    index: number,
    missing?: "parkingType" | "spots"
) => {
    await addParking(page);
    if (missing !== "parkingType") await selectParkingTypeOption(page, index);
    if (missing !== "spots") await fillInSpots(page, index);
};

const addParkingComplete = (page: Page, index: number) =>
    addParkingInComplete(page, index, undefined);

// ---------------------------------------------------------------------

const addBalcony = async (page: Page) =>
    page.getByTestId(ADD_BALCONY_BUTTON_TESTID).click();

const selectSideOption = async (page: Page, index: number) => {
    const data = await getGlobals(page);
    const balconySide = data?.property?.details?.balconySide;
    const key = balconySide?.at(0)?.key || "";
    expect(key).not.toBe("");
    const TESTID = getOptionTestId(key);
    await clickOptions(page, getBalconySideTestId(index), [TESTID], false);
};

const fillInArea = (page: Page, index: number) =>
    fillAndExpect(page, getAreaTestId(index), "123");

const addBalconyInComplete = async (
    page: Page,
    index: number,
    missing?: "side" | "area"
) => {
    await addBalcony(page);
    if (missing !== "side") await selectSideOption(page, index);
    if (missing !== "area") await fillInArea(page, index);
};

const addBalconyComplete = (page: Page, index: number) =>
    addBalconyInComplete(page, index, undefined);

// ---------------------------------------------------------------------

const getFormErrors = async (page: Page) => {
    const c = await page.getByTestId(RHF_ERRORS_TESTID).textContent();
    expect(c).not.toBe(null);

    const j = JSONParseSafe<FieldErrors<IPropertiesPOST>>(c);
    expect(j).not.toBe(null);

    return j!;
};

// ---------------------------------------------------------------------

const getParkingErrors = async (page: Page) => {
    const j = await getFormErrors(page);
    return j.details?.parkings ?? [];
};

const expectParkingError = async (
    page: Page,
    field: "parkingType" | "spots"
) => {
    const p = await getParkingErrors(page);
    const c = p?.find((err: any) => {
        if (!err) return false;
        return typeof err === "object" && field in err;
    });
    expect(c).not.toBe(undefined);
};

const expectParkingTypeMissing = (page: Page) =>
    expectParkingError(page, "parkingType");

const expectSpotsMissing = (page: Page) => expectParkingError(page, "spots");

// ------------------------------------------------------------------------

test.describe("edit", () => {
    test("basic", async ({ page }) => {
        const { code, state } = await basicEdit(page);
        await expectSuccessfulSubmit(page, code, state);
    });

    test.describe("balconies & parkings", () => {
        // test.describe("balconies", () => {
        //     test.describe("1", () => {
        //         test("complete", async ({ page }) => {
        //             const { code, state } = await basicEdit(page);
        //             await addBalconyComplete(page, 0);
        //             await submitAndInterceptRequest(page);
        //             await expectSuccessfulSubmit(page, code, state);
        //         });
        //         test("in-complete (no side)", async ({ page }) => {
        //             await basicEdit(page);
        //             await addBalconyInComplete(page, 0, "side");
        //             await clickSubmit(page);
        //         });
        //         test("in-complete (no area)", async ({ page }) => {
        //             await basicEdit(page);
        //             await addBalconyInComplete(page, 0, "area");
        //             await clickSubmit(page);
        //         });
        //     });

        //     test.describe("1+", () => {
        //         test("complete", async ({ page }) => {
        //             const { code, state } = await basicEdit(page);
        //             await addBalconyComplete(page, 0);
        //             await addBalconyComplete(page, 1);
        //             await submitAndInterceptRequest(page);
        //             await expectSuccessfulSubmit(page, code, state);
        //         });
        //         test("in-complete (no side)", async ({ page }) => {
        //             await basicEdit(page);
        //             await addBalconyComplete(page, 0);
        //             await addBalconyInComplete(page, 1, "side");
        //             await clickSubmit(page);
        //         });
        //         test("in-complete (no area)", async ({ page }) => {
        //             await basicEdit(page);
        //             await addBalconyComplete(page, 0);
        //             await addBalconyInComplete(page, 1, "area");
        //             await clickSubmit(page);
        //         });
        //     });
        // });

        test.describe("parkings", () => {
            test.describe("1", () => {
                test("complete", async ({ page }) => {
                    const { code, state } = await basicEdit(page);
                    await addParkingComplete(page, 0);
                    await submitAndInterceptRequest(page);
                    await expectSuccessfulSubmit(page, code, state);
                });
                test("in-complete (no parkingType)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingInComplete(page, 0, "parkingType");
                    await clickSubmit(page);

                    await expectParkingTypeMissing(page);
                });
                test("in-complete (no spots)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingInComplete(page, 0, "spots");
                    await clickSubmit(page);

                    await expectSpotsMissing(page);
                });
            });

            test.describe("1+", () => {
                test("complete", async ({ page }) => {
                    const { code, state } = await basicEdit(page);
                    await addParkingComplete(page, 0);
                    await addParkingComplete(page, 1);
                    await submitAndInterceptRequest(page);
                    await expectSuccessfulSubmit(page, code, state);
                });
                test("in-complete (no parkingType)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingComplete(page, 0);
                    await addParkingInComplete(page, 1, "parkingType");
                    await clickSubmit(page);

                    await expectParkingTypeMissing(page);
                });
                test("in-complete (no spots)", async ({ page }) => {
                    await basicEdit(page);
                    await addParkingComplete(page, 0);
                    await addParkingInComplete(page, 1, "spots");
                    await clickSubmit(page);

                    await expectSpotsMissing(page);
                });
            });
        });
    });
});
