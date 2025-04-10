import { test, expect, MountResult } from "@playwright/experimental-ct-react";
import React from "react";
import {
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
} from "./useCallbackSetter.comp";
import Tester from "./useCallbackSetter.comp";
import clickAndExpect from "./_util/clickAndExpect";

/**
 * Checks state initial value
 */
const checkInitial = async (component: MountResult) => {
    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");
};

// ------------------------------------------------------------------------------

test("DirectUpdate", async ({ mount }) => {
    const component = await mount(<Tester />);

    // Check initial value
    await checkInitial(component);

    await clickAndExpect(component, SET_DIRECT_ID, VALUE_ID, "direct update");
});

test("UpdateWithCallback", async ({ mount }) => {
    const component = await mount(<Tester />);

    await checkInitial(component);

    await clickAndExpect(
        component,
        SET_CALLBACK_ID,
        VALUE_ID,
        "initial with callback"
    );
});

test("Multiple", async ({ mount }) => {
    const component = await mount(<Tester />);

    await checkInitial(component);

    await clickAndExpect(
        component,
        SET_MULTIPLE_ID,
        VALUE_ID,
        "test then second"
    );
});
