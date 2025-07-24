import { test } from "@playwright/experimental-ct-react";
import Tester from "./index.comp";
import {
    DISPATCH_BTN0_ID,
    DISPATCH_BTN1_ID,
    VALUE0_ID,
    VALUE1_ID,
    FINAL,
} from "./index.comp";
import clickAndExpect from "../_util/clickAndExpect";

test("Global", async ({ mount }) => {
    const component = await mount(<Tester />);
    await clickAndExpect(component, DISPATCH_BTN0_ID, VALUE0_ID, FINAL);
});

test("Targeted", async ({ mount }) => {
    const component = await mount(<Tester />);
    await clickAndExpect(component, DISPATCH_BTN1_ID, VALUE1_ID, FINAL);
});
