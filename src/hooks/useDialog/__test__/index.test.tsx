import { render } from "@testing-library/react";
import Tester, {
    VALUE_TRUE,
    VALUE_FALSE,
    // ...
    OPEN_BUTTON_ID,
    CLOSE_BUTTON_ID,
    VALUE_ID,
} from "./index.comp";
import clickAndExpect from "@/test/clickAndExpect";
import expectValue from "@/test/expectValue";

describe("useDialog", () => {
    test("open", async () => {
        render(<Tester />);
        await expectValue(VALUE_ID, VALUE_FALSE);
        await clickAndExpect(OPEN_BUTTON_ID, VALUE_ID, VALUE_TRUE);
    });
    test("initial & close", async () => {
        render(<Tester initial={true} />);
        await expectValue(VALUE_ID, VALUE_TRUE);
        await clickAndExpect(CLOSE_BUTTON_ID, VALUE_ID, VALUE_FALSE);
    });
});
