import { expect, MountResult, test } from "@playwright/experimental-ct-react";
import Tester from "./Tester";
import { VALUE_ID } from "./Tester";
import {
    NOT_SELECTED_TESTID,
    getOptionTestId,
} from "../../../../src/components/hook-form/Select/constants";
import { NOT_SELECTED_VALUE } from "../../../../src/constants/select";
import { OPTIONS } from "./constants";
import { Page } from "playwright-core";

const clickAndExpect = async (
    component: MountResult,
    page: Page,
    OPTION_IDs: string[],
    value: string
) => {
    await component.locator(".MuiSelect-select").click();
    await page.locator('[role="listbox"]').waitFor(); // wait for popover to appear

    for (const OPTION_ID of OPTION_IDs) {
        await page.getByTestId(OPTION_ID).click();
    }

    await expect(component.getByTestId(VALUE_ID)).toHaveText(value);
};

// Testing set & clear for all these cases:
// 1. not multiple, not enum (a.k.a. single selection)
// 2. multiple, not enum (a.k.a. multiple)
// 3. not multiple, yes enum
// 4. yes multiple, yes enum

test("Set & Clear (Single)", async ({ mount, page }) => {
    const component = await mount(<Tester />);

    // Click & Expect Option
    const OPTION = OPTIONS[1];
    const OPTION_TEST_ID = getOptionTestId(OPTION.key);
    await clickAndExpect(component, page, [OPTION_TEST_ID], OPTION.key);

    // Clear & Expect
    await clickAndExpect(
        component,
        page,
        [NOT_SELECTED_TESTID],
        NOT_SELECTED_VALUE
    );
});

test("Set & Clear (Multiple)", async ({ mount, page }) => {
    const component = await mount(<Tester multiple />);

    // Click & Expect Option
    const OPTION0 = OPTIONS[0];
    const OPTION1 = OPTIONS[1];
    const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
    const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
    await clickAndExpect(
        component,
        page,
        [OPTION0_TEST_ID, OPTION1_TEST_ID],
        JSON.stringify([OPTION0.key, OPTION1.key])
    );

    // Clear & Expect
    await clickAndExpect(
        component,
        page,
        [NOT_SELECTED_TESTID],
        JSON.stringify([])
    );
});

// test("Set & Clear (Single & Enum)", async ({ mount }) => {
//     const component = await mount(<Tester isEnum />);
// });

// test("Set & Clear (Single & Multiple)", async ({ mount }) => {
//     const component = await mount(<Tester multiple isEnum />);
// });
