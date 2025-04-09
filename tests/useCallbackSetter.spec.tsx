import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";
import {
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    VALUE_ID,
} from "./useCallbackSetter.comp";
import Tester from "./useCallbackSetter.comp";

test("useCallbackSetter.DirectUpdate", async ({ mount }) => {
    const component = await mount(<Tester />);

    // Check initial value
    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");

    // Perform locator click. This will trigger the event.
    await component.getByTestId(SET_DIRECT_ID).click();

    // Check that the value has been updated correctly
    await expect(valueLocator).toHaveText("direct update");
});

test("useCallbackSetter.UpdateWithCallback", async ({ mount }) => {
    const component = await mount(<Tester />);

    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");

    await component.getByTestId(SET_CALLBACK_ID).click();

    await expect(valueLocator).toHaveText("initial with callback");
});
