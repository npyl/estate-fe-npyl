import { test, expect, MountResult } from "@playwright/experimental-ct-react";
import React from "react";
import {
    getLevel2,
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    TEST_LEVEL2_ID,
    VALUE_ID,
    VALUE_LEVEL2_ID,
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

const checkInitialLevel2 = async (component: MountResult) => {
    const valueLocator = component.getByTestId(VALUE_LEVEL2_ID);
    await expect(valueLocator).toHaveText(getLevel2("initial"));
};

test("Levels", async ({ mount }) => {
    const component = await mount(<Tester />);

    await checkInitialLevel2(component);

    const DIRECT = "direct update";
    const EXPECTED = `${getLevel2(DIRECT)}_123`;

    await clickAndExpect(component, SET_DIRECT_ID, VALUE_ID, DIRECT);
    await clickAndExpect(component, TEST_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECTED);
});

// -------------------------------------------------------------------------------
