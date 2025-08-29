import { act, render, screen } from "@testing-library/react";
import Tester, { BUTTON_ID, VALUE_ID } from "./index.comp";
import expectValue from "@/test/expectValue";

const DELAY = 2 * 60 * 1000;

const clickButton = async () => {
    await act(async () => {
        screen.getByTestId(BUTTON_ID).click();
    });
};

describe("useConditionalMemo", () => {
    it(
        "accepts",
        async () => {
            render(<Tester isConditionMet={true} />);
            await expectValue(VALUE_ID, "-1");
            await clickButton();
            await expectValue(VALUE_ID, "10");
        },
        DELAY
    );
    it(
        "rejects",
        async () => {
            render(<Tester isConditionMet={false} />);
            await expectValue(VALUE_ID, "-1");
            await clickButton();
            await expectValue(VALUE_ID, "-1");
        },
        DELAY
    );
});
