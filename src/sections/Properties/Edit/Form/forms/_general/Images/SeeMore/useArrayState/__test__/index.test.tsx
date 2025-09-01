import { render } from "@testing-library/react";
import Tester, {
    AFTER,
    INITIAL,
    RESET_BUTTON_ID,
    SET_BUTTON_ID,
    VALUE_ID,
} from "./index.comp";
import clickAndExpect from "@/test/clickAndExpect";
import expectValue from "@/test/expectValue";

describe("useArrayState", () => {
    test("initial", async () => {
        render(<Tester />);
        await expectValue(VALUE_ID, JSON.stringify(INITIAL));
    });

    test("set & re-set", async () => {
        render(<Tester />);
        await clickAndExpect(SET_BUTTON_ID, VALUE_ID, JSON.stringify(AFTER));
        await clickAndExpect(
            RESET_BUTTON_ID,
            VALUE_ID,
            JSON.stringify(INITIAL)
        );
    });
});
