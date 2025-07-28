import { test } from "@playwright/experimental-ct-react";
import Tester from "./index.comp";
import {
    FALLBACK_VALUE,
    SPECIFIC_VALUE,
    VERSION_STORED,
    // ...
    REMOVE_VALUE_ID,
    SET_VALUE_ID,
    VALUE_ID,
    // ...
    getVersioned,
} from "./index.comp";
import expectValue from "../_util/expectValue";
import clickAndExpect from "../_util/clickAndExpect";

const FALLBACK_VALUE_STR = JSON.stringify(FALLBACK_VALUE);
const SPECIFIC_VALUE_STR = JSON.stringify(SPECIFIC_VALUE);

test("Set", async ({ mount }) => {
    const component = await mount(<Tester />);
    await expectValue(component, VALUE_ID, FALLBACK_VALUE_STR);
    await clickAndExpect(component, SET_VALUE_ID, VALUE_ID, SPECIFIC_VALUE_STR);
});

test("Remove", async ({ mount }) => {
    const component = await mount(<Tester />);
    await expectValue(component, VALUE_ID, FALLBACK_VALUE_STR);
    await clickAndExpect(component, SET_VALUE_ID, VALUE_ID, SPECIFIC_VALUE_STR);
    await clickAndExpect(
        component,
        REMOVE_VALUE_ID,
        VALUE_ID,
        FALLBACK_VALUE_STR
    );
});

const VERSION_WANTED = 2;

const INJECTED_INITIAL_VALUE = getVersioned(VERSION_STORED, SPECIFIC_VALUE);

test("Version Mismatch w/ Update", async ({ mount }) => {
    const component = await mount(
        <Tester
            injectedValue={INJECTED_INITIAL_VALUE}
            version={VERSION_WANTED}
        />
    );

    // INFO: due to version mismatch we expect a FALLBACK_VALUE and not a SPECIFIC_VALUE; this is actually the point of the whole hook!
    await expectValue(component, VALUE_ID, FALLBACK_VALUE_STR);
    await clickAndExpect(component, SET_VALUE_ID, VALUE_ID, SPECIFIC_VALUE_STR);
});
