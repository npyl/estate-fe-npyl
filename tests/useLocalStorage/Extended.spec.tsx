import { MountResult, test } from "@playwright/experimental-ct-react";
import Leveled from "./Extended.comp";
import {
    TEST_LEVEL2_ID,
    UPDATE_LEVEL2_ID,
    VALUE_LEVEL2_ID,
} from "./Extended.comp";
import clickAndExpectOrg from "../_util/clickAndExpect";

/**
 * Clicks on a button and checks both state and cookie value change
 */
const clickAndExpect = async (
    component: MountResult,
    // ...
    clickId: string,
    valueId: string,
    // ...
    expected: string | undefined,
    fallback?: string
) => {
    if (!expected && !fallback) throw "Cannot be both undefined";

    // INFO: when cookie is non-existent, the fallback value is expected as of useCookie's behaviour
    const actualExpected = (expected || fallback)!;

    await clickAndExpectOrg(component, clickId, valueId, actualExpected);

    // TODO: add localStorage check ?
    // await expectItem(page, expected);
};

test("Levels", async ({ mount }) => {
    const component = await mount(<Leveled />);

    const EXPECT0 = JSON.stringify([1, 2, 3, 4]);
    const EXPECT1 = JSON.stringify([1, 2, 3, 4, 5]);

    await clickAndExpect(component, UPDATE_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT0);
    await clickAndExpect(component, TEST_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT1);
});
