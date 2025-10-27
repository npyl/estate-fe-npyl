import { expect, Page, test } from "@playwright/test";
import createProperty from "./../_util/create";
import { PROPERTY } from "../../../src/constants/tests";
import { IProperties } from "../../../src/types/properties";
import basicEdit from "./basicEdit";

// -----------------------------------------------------------------------------

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

const addParking = async () => {};
const selectParkTypeOption = async () => {};
const fillInSpots = async () => {};

const addParkingInComplete = async (missing?: "parkType" | "spots") => {
    await addParking();
    if (missing !== "parkType") await selectParkTypeOption();
    if (missing !== "spots") await fillInSpots();
};

const addParkingComplete = () => addParkingInComplete(undefined);

// ---------------------------------------------------------------------

const addBalcony = async () => {};
const selectSideOption = async () => {};
const fillInArea = async () => {};

const addBalconyInComplete = async (missing?: "side" | "area") => {
    await addBalcony();
    if (missing !== "side") await selectSideOption();
    if (missing !== "area") await fillInArea();
};

const addBalconyComplete = () => addBalconyInComplete(undefined);

// ---------------------------------------------------------------------

test.describe("edit", () => {
    test("basic", async ({ page }) => {
        const { code, state } = await basicEdit(page);
        await expectSuccessfulSubmit(page, code, state);
    });

    describe("balconies & parkings", () => {
        describe("balconies", () => {
            describe("1", () => {
                test("complete", async ({ page }) => {
                    await createProperty(page);
                    await addBalconyComplete();
                });
                test("in-complete (no side)", async ({ page }) => {
                    await createProperty(page);
                    await addBalconyInComplete("side");
                });
                test("in-complete (no area)", async ({ page }) => {
                    await createProperty(page);
                    await addBalconyInComplete("area");
                });
            });

            describe("1+", () => {
                test("complete", async ({ page }) => {
                    await createProperty(page);
                    await addBalconyComplete();
                    await addBalconyInComplete();
                });
                test("in-complete (no side)", async ({ page }) => {
                    await createProperty(page);
                    await addBalconyComplete();
                    await addBalconyInComplete("side");
                });
                test("in-complete (no area)", async ({ page }) => {
                    await createProperty(page);
                    await addBalconyComplete();
                    await addBalconyInComplete("area");
                });
            });
        });

        describe("parkings", () => {
            describe("1", () => {
                test("complete", async ({ page }) => {
                    await createProperty(page);
                    await addParkingComplete();
                });
                test("in-complete (no parkType)", async ({ page }) => {
                    await createProperty(page);
                    await addParkingInComplete("parkType");
                });
                test("in-complete (no spots)", async ({ page }) => {
                    await createProperty(page);
                    await addParkingInComplete("spots");
                });
            });

            describe("1+", () => {
                test("complete", async ({ page }) => {
                    await createProperty(page);
                    await addParkingComplete();
                    await addParkingComplete();
                });
                test("in-complete (no parkType)", async ({ page }) => {
                    await createProperty(page);
                    await addParkingInComplete("parkType");
                });
                test("in-complete (no spots)", async ({ page }) => {
                    await createProperty(page);
                    await addParkingInComplete("spots");
                });
            });
        });
    });
});
