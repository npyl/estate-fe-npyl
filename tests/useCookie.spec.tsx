import { test, expect, MountResult } from "@playwright/experimental-ct-react";
import React from "react";
import {
    COOKIE_REMOVE_ID,
    cookieName,
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
} from "./useCookie.comp";
import Tester from "./useCookie.comp";
import { Page } from "playwright-core";

import clickAndExpectOrg from "./_util/clickAndExpect";

/**
 * Check actual cookie value (stored inside browser)
 * @param page
 * @param value
 */
const expectCookie = async (page: Page, value?: string) => {
    const encoded = value ? encodeURIComponent(value) : undefined;
    const cookies = await page.context().cookies();
    const initialCookie = cookies.find(({ name }) => name === cookieName);
    expect(initialCookie?.value).toBe(encoded);
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
    await expectCookie(page, expected);
};

/**
 * Checks state initial value
 */
const checkInitial = async (component: MountResult) => {
    const valueLocator = component.getByTestId(VALUE_ID);
    await expect(valueLocator).toHaveText("initial");
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
        COOKIE_REMOVE_ID,
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
        COOKIE_REMOVE_ID,
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
