import { test } from "@playwright/test";
import { TTestCb } from "../_types";
import createProperty from "./_util/create";
import expectUrl from "./_util/expectUrl";

const create = async ({ page }: TTestCb) => {
    test.setTimeout(5 * 60 * 1000);
    const propertyId = await createProperty(page);
    await expectUrl(page, propertyId);
};

test.describe("property-basics", () => {
    test("create", create);
});
