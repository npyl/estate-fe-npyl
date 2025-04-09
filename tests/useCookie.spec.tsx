import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import {
    COOKIE_REMOVE_ID,
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
} from "./useCookie.comp";
import Tester from "./useCookie.comp";

// ---------------------------------------------------------------------------------------------------
//          BASIC
// ---------------------------------------------------------------------------------------------------

test("useCookie.DirectUpdate", async ({ mount }) => {
    const component = await mount(<Tester />);

    // Check initial value
    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");

    // Perform locator click. This will trigger the event.
    await component.getByTestId(SET_DIRECT_ID).click();

    // Check that the value has been updated correctly
    await expect(valueLocator).toHaveText("direct update");
});

test("useCookie.UpdateWithCallback", async ({ mount }) => {
    const component = await mount(<Tester />);

    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");

    await component.getByTestId(SET_CALLBACK_ID).click();

    await expect(valueLocator).toHaveText("initial with callback");
});

test("useCookie.Multiple", async ({ mount }) => {
    const component = await mount(<Tester />);

    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");

    await component.getByTestId(SET_MULTIPLE_ID).click();

    await expect(valueLocator).toHaveText("initial with callback");
});

test("useCookie.Remove", async ({ mount }) => {
    const component = await mount(<Tester />);

    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");

    await component.getByTestId(COOKIE_REMOVE_ID).click();

    await expect(valueLocator).toHaveText("initial");
});

// ---------------------------------------------------------------------------------------------------
//          COMPLEX
// ---------------------------------------------------------------------------------------------------

test("useCookie.Complex", async ({ mount }) => {
    let valueLocator;

    const component = await mount(<Tester />);

    // initial value
    valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");

    // Direct set
    await component.getByTestId(SET_DIRECT_ID).click();
    valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("direct update");

    // Callback set
    await component.getByTestId(SET_CALLBACK_ID).click();
    valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("direct update with callback");

    // Remove
    await component.getByTestId(COOKIE_REMOVE_ID).click();
    valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");
});
