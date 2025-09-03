import { render } from "@testing-library/react";
import Tester, {
    VALUE_TRUE,
    VALUE_FALSE,
    // ...
    TOGGLE_BUTTON_ID,
    SET_BUTTON_ID,
    VALUE_ID,
} from "./index.comp";
import clickAndExpect from "@/test/clickAndExpect";
import expectValue from "@/test/expectValue";

describe("useToggle", () => {
    test("initial", async () => {
        render(<Tester initial={true} />);
        await expectValue(VALUE_ID, VALUE_TRUE);
    });
    test("toggle", async () => {
        render(<Tester />);
        await expectValue(VALUE_ID, VALUE_FALSE);
        await clickAndExpect(TOGGLE_BUTTON_ID, VALUE_ID, VALUE_TRUE);
    });
    test("set", async () => {
        render(<Tester />);
        await expectValue(VALUE_ID, VALUE_FALSE);
        await clickAndExpect(SET_BUTTON_ID, VALUE_ID, VALUE_TRUE);
    });
});
