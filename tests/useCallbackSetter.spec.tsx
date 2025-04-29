import { test, expect, MountResult } from "@playwright/experimental-ct-react";
import {
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
    // ...
    TEST_LEVEL2_ID,
    VALUE_LEVEL2_ID,
    UPDATE_LEVEL2_ID,
} from "./useCallbackSetter.comp";
import Tester from "./useCallbackSetter.comp";
import clickAndExpect from "./_util/clickAndExpect";
import React from "react";

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

// -------------------------------------------------------------------------------

/**
 * This test is for leveled use of useCallbackSetter, for example:
 *
 * // level0
 * const [state, _setState] = useStore();
 * const setState = useCallbackSetter(state, _setState);
 *
 * // level1
 * const level1 = state.something;
 * const _setLevel1 = useCallback((l: ...) => setState((old) => ...), [])
 * const setLevel1 = useCallbackSetter(level1, _setLevel1);
 *
 * It tests for the scenario where a change in level0 is not synced to level1
 */

test("Levels", async ({ mount }) => {
    const component = await mount(<Tester />);

    const EXPECT0 = JSON.stringify([1, 2, 3, 4]);
    const EXPECT1 = JSON.stringify([1, 2, 3, 4, 5]);

    await clickAndExpect(component, UPDATE_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT0);
    await clickAndExpect(component, TEST_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT1);
});

// -------------------------------------------------------------------------------
