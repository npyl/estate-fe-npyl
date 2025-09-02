import { expect, MountResult, test } from "@playwright/experimental-ct-react";
import Tester from "./Tester";
import { VALUE_ID, SELECT_ID } from "./Tester";
import {
    NOT_SELECTED_TESTID,
    getOptionTestId,
} from "../../../../src/components/hook-form/Select/constants";
import { NOT_SELECTED_VALUE } from "../../../../src/constants/select";
import { OPTIONS } from "./constants";
import { Page } from "playwright-core";
import clickOptions from "../../../_util/select/clickOptions";

// -------------------------------------------------------------
// Set          - click on an option
// Set other    - click on a different option
// Re-set       - click on a previous option
// Clear        - click on "not-selected" option
// -------------------------------------------------------------
// Testing Set, Set other, Re-set & Clear for all these cases:
// 1. not multiple, not enum (a.k.a. single selection)
// 2. multiple, not enum (a.k.a. multiple)
// 3. not multiple, yes enum
// 4. yes multiple, yes enum

// ----------------------------------------------------------------------------------------

const clickAndExpect = async (
    component: MountResult,
    page: Page,
    OPTION_IDs: string[],
    value: string
) => {
    await clickOptions(page, SELECT_ID, OPTION_IDs);
    await expect(component.getByTestId(VALUE_ID)).toHaveText(value);
};

// ----------------------------------------------------------------------------------------

test("Set, Set other & Clear (Single)", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Set
    const OPTION0 = OPTIONS[0];
    const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
    const EXPECTED0 = JSON.stringify(OPTION0.key);
    await clickAndExpect(component, page, [OPTION0_TEST_ID], EXPECTED0);

    // Set other
    const OPTION1 = OPTIONS[1];
    const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
    const EXPECTED1 = JSON.stringify(OPTION1.key);
    await clickAndExpect(component, page, [OPTION1_TEST_ID], EXPECTED1);

    // Clear
    const EXPECTED_CLEAR = JSON.stringify(NOT_SELECTED_VALUE);
    await clickAndExpect(
        component,
        page,
        [NOT_SELECTED_TESTID],
        EXPECTED_CLEAR
    );
});

test("Set, Set other, Re-set (Multiple)", async ({ mount, page }) => {
    const component = await mount(<Tester multiple />);

    // Set
    const OPTION0 = OPTIONS[0];
    const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
    const EXPECTED0 = JSON.stringify([OPTION0.key]);
    await clickAndExpect(component, page, [OPTION0_TEST_ID], EXPECTED0);

    // Set other
    const OPTION1 = OPTIONS[1];
    const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
    const EXPECTED1 = JSON.stringify([OPTION0.key, OPTION1.key]);
    await clickAndExpect(component, page, [OPTION1_TEST_ID], EXPECTED1);

    // Re-set (re-click OPTION1)
    await clickAndExpect(component, page, [OPTION1_TEST_ID], EXPECTED0);

    // Clear
    await clickAndExpect(
        component,
        page,
        [NOT_SELECTED_TESTID],
        JSON.stringify([])
    );
});

test("Set, Set other (Single & Enum)", async ({ mount, page }) => {
    const component = await mount(<Tester isEnum />);

    // Set
    const OPTION0 = OPTIONS[0];
    const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
    const EXPECTED0 = JSON.stringify(OPTION0.key);
    await clickAndExpect(component, page, [OPTION0_TEST_ID], EXPECTED0);

    // Set other
    const OPTION1 = OPTIONS[1];
    const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
    const EXPECTED1 = JSON.stringify(OPTION1.key);
    await clickAndExpect(component, page, [OPTION1_TEST_ID], EXPECTED1);

    // Clear
    await clickAndExpect(
        component,
        page,
        [NOT_SELECTED_TESTID],
        JSON.stringify(null)
    );
});

test("Set, Set other, Re-set & Clear (Multiple & Enum)", async ({
    mount,
    page,
}) => {
    const component = await mount(<Tester multiple isEnum />);

    // Set
    const OPTION0 = OPTIONS[0];
    const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
    const EXPECTED0 = JSON.stringify([OPTION0.key]);
    await clickAndExpect(component, page, [OPTION0_TEST_ID], EXPECTED0);

    // Set other
    const OPTION1 = OPTIONS[1];
    const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
    const EXPECTED1 = JSON.stringify([OPTION0.key, OPTION1.key]);
    await clickAndExpect(component, page, [OPTION1_TEST_ID], EXPECTED1);

    // Re-set (re-click OPTION1)
    await clickAndExpect(component, page, [OPTION1_TEST_ID], EXPECTED0);

    // Clear
    await clickAndExpect(
        component,
        page,
        [NOT_SELECTED_TESTID],
        JSON.stringify([])
    );
});
