import { render } from "@testing-library/react";
import Tester, {
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
import expectValue from "@/test/expectValue";
import clickAndExpect from "@/test/clickAndExpect";

const FALLBACK_VALUE_STR = JSON.stringify(FALLBACK_VALUE);
const SPECIFIC_VALUE_STR = JSON.stringify(SPECIFIC_VALUE);

const VERSION_WANTED = 2;

const INJECTED_INITIAL_VALUE = getVersioned(VERSION_STORED, SPECIFIC_VALUE);

describe("useVersioned", () => {
    test("Set", async () => {
        render(<Tester />);

        await expectValue(VALUE_ID, FALLBACK_VALUE_STR);
        await clickAndExpect(SET_VALUE_ID, VALUE_ID, SPECIFIC_VALUE_STR);
    });

    test("Remove", async () => {
        render(<Tester />);
        await expectValue(VALUE_ID, FALLBACK_VALUE_STR);
        await clickAndExpect(SET_VALUE_ID, VALUE_ID, SPECIFIC_VALUE_STR);
        await clickAndExpect(REMOVE_VALUE_ID, VALUE_ID, FALLBACK_VALUE_STR);
    });

    test("Version Mismatch w/ Update", async () => {
        render(
            <Tester
                injectedValue={INJECTED_INITIAL_VALUE}
                version={VERSION_WANTED}
            />
        );

        // INFO: due to version mismatch we expect a FALLBACK_VALUE and not a SPECIFIC_VALUE; this is actually the point of the whole hook!
        await expectValue(VALUE_ID, FALLBACK_VALUE_STR);
        await clickAndExpect(SET_VALUE_ID, VALUE_ID, SPECIFIC_VALUE_STR);
    });
});
