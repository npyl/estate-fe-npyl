import { test } from "@playwright/test";
import { TTestCb } from "../_types";
import createProperty from "./_util/create";

const create = async ({ page }: TTestCb) => {
    test.setTimeout(5 * 60 * 1000);
    await createProperty(page);
};

test.describe("property-basics", () => {
    test("create", create);
});
