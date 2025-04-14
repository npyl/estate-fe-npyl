import { test, expect, MountResult } from "@playwright/experimental-ct-react";
import {
    itemName,
    INITIAL,
    // ...
    ITEM_REMOVE_ID,
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
    // ...
    SET_DIRECT_ID_EVENT,
    SET_CALLBACK_ID_EVENT,
    SET_MULTIPLE_ID_EVENT,
    ITEM_REMOVE_ID_EVENT,
} from "./useLocalStorage.comp";
import Tester from "./useLocalStorage.comp";
import { Page } from "playwright-core";
import clickAndExpectOrg from "./_util/clickAndExpect";
import React from "react";

/**
 * Check actual localStorage item value (stored inside browser)
 * @param page
 * @param value
 */
const expectItem = async (page: Page, value?: string) => {
    // Use Playwright's page.evaluate to execute JavaScript in the browser context
    // and retrieve the localStorage item value
    const storedValue = await page.evaluate((key) => {
        return window.localStorage.getItem(key);
    }, itemName);

    if (value === undefined) {
        // If we expect no value (item was removed), the localStorage should return null
        expect(storedValue).toBeNull();
    } else {
        // Values in localStorage are JSON-stringified, so we need to parse them
        const parsedValue = storedValue ? JSON.parse(storedValue) : storedValue;
        expect(parsedValue).toBe(value);
    }
};

/**
 * Clicks on a button and checks both state and cookie value change
 */
const clickAndExpect = async (
    component: MountResult,
    page: Page,
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
    await expectItem(page, expected);
};

/**
 * Checks state initial value
 */
const checkInitial = async (component: MountResult) => {
    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText(INITIAL);
};

// ---------------------------------------------------------------------------------------------------
//          BASIC
// ---------------------------------------------------------------------------------------------------

test("DirectUpdate", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Check initial value
    await checkInitial(component);

    await clickAndExpect(
        component,
        page,
        SET_DIRECT_ID,
        VALUE_ID,
        "direct update"
    );
});

test("UpdateWithCallback", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Check initial value
    await checkInitial(component);

    await clickAndExpect(
        component,
        page,
        SET_CALLBACK_ID,
        VALUE_ID,
        "initial with callback"
    );
});

test("Multiple", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Check initial value
    await checkInitial(component);

    await clickAndExpect(
        component,
        page,
        SET_MULTIPLE_ID,
        VALUE_ID,
        "test then second"
    );
});

test("Remove", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Check initial value
    await checkInitial(component);

    await clickAndExpect(
        component,
        page,
        ITEM_REMOVE_ID,
        VALUE_ID,
        undefined,
        "initial"
    );
});

// ---------------------------------------------------------------------------------------------------
//          COMPLEX
// ---------------------------------------------------------------------------------------------------

test("Complex", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Check initial value
    await checkInitial(component);

    // Direct set
    await clickAndExpect(
        component,
        page,
        SET_DIRECT_ID,
        VALUE_ID,
        "direct update"
    );

    // Callback set
    await clickAndExpect(
        component,
        page,
        SET_CALLBACK_ID,
        VALUE_ID,
        "direct update with callback"
    );

    // Multiple
    await clickAndExpect(
        component,
        page,
        SET_MULTIPLE_ID,
        VALUE_ID,
        "test then second"
    );

    // Remove
    await clickAndExpect(
        component,
        page,
        ITEM_REMOVE_ID,
        VALUE_ID,
        undefined,
        "initial"
    );

    // re-set (direct) after cookie removal
    await clickAndExpect(
        component,
        page,
        SET_DIRECT_ID,
        VALUE_ID,
        "direct update"
    );
});

// ---------------------------------------------------------------------------------------------------
//          COMPLEX w/ Events
// ---------------------------------------------------------------------------------------------------

test("Complex w/ Events", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Check initial value
    await checkInitial(component);

    // Direct set
    await clickAndExpect(
        component,
        page,
        SET_DIRECT_ID_EVENT,
        VALUE_ID,
        "direct update"
    );

    // Callback set
    await clickAndExpect(
        component,
        page,
        SET_CALLBACK_ID_EVENT,
        VALUE_ID,
        "direct update with callback"
    );

    // Multiple
    await clickAndExpect(
        component,
        page,
        SET_MULTIPLE_ID_EVENT,
        VALUE_ID,
        "test then second"
    );

    // Remove
    await clickAndExpect(
        component,
        page,
        ITEM_REMOVE_ID_EVENT,
        VALUE_ID,
        undefined,
        "initial"
    );

    // re-set (direct) after cookie removal
    await clickAndExpect(
        component,
        page,
        SET_DIRECT_ID_EVENT,
        VALUE_ID,
        "direct update"
    );
});
