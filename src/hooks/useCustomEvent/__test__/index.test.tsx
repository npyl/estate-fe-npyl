import Tester, {
    DISPATCH_BTN0_ID,
    DISPATCH_BTN1_ID,
    VALUE0_ID,
    VALUE1_ID,
    FINAL,
} from "./index.comp";
import clickAndExpect from "@/test/clickAndExpect";
import { render } from "@testing-library/react";

describe("useCustomEvent", () => {
    it("Global", async () => {
        render(<Tester />);
        await clickAndExpect(DISPATCH_BTN0_ID, VALUE0_ID, FINAL);
    });

    it("Targeted", async () => {
        render(<Tester />);
        await clickAndExpect(DISPATCH_BTN1_ID, VALUE1_ID, FINAL);
    });
});
