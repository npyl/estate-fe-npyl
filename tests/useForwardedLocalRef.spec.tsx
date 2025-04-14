import { test } from "@playwright/experimental-ct-react";
import {
    RES_WORKS,
    TEST_BUTTON_ID,
    VALUE_ID,
} from "./useForwardedLocalRef.comp";
import Tester from "./useForwardedLocalRef.comp";
import React from "react";
import clickAndExpect from "./_util/clickAndExpect";

test("Basic", async ({ mount }) => {
    const component = await mount(<Tester />);
    await clickAndExpect(component, TEST_BUTTON_ID, VALUE_ID, RES_WORKS);
});
