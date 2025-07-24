import { test } from "@playwright/experimental-ct-react";
import {
    FINAL,
    RES_WORKS,
    TEST_BUTTON0_ID,
    TEST_BUTTON1_ID,
    VALUE_ID,
} from "./index.comp";
import Tester from "./index.comp";
import clickAndExpect from "../_util/clickAndExpect";

test("Basic", async ({ mount }) => {
    const component = await mount(<Tester />);
    await clickAndExpect(component, TEST_BUTTON0_ID, VALUE_ID, RES_WORKS);
});

test("More", async ({ mount }) => {
    const component = await mount(<Tester />);
    await clickAndExpect(component, TEST_BUTTON1_ID, VALUE_ID, FINAL);
});
