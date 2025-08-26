import { render } from "@testing-library/react";
import Tester, {
    FINAL,
    RES_WORKS,
    TEST_BUTTON0_ID,
    TEST_BUTTON1_ID,
    VALUE_ID,
} from "./index.comp";
import clickAndExpect from "@/test/clickAndExpect";

describe("useForwadedLocalRef", () => {
    it("Basic", async () => {
        render(<Tester />);
        await clickAndExpect(TEST_BUTTON0_ID, VALUE_ID, RES_WORKS);
    });

    it("More", async () => {
        render(<Tester />);
        await clickAndExpect(TEST_BUTTON1_ID, VALUE_ID, FINAL);
    });
});
