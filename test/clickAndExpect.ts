import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import expectValue from "./expectValue";

/**
 * Click a button & Expect a specific value on a div
 * @param clickId
 * @param valueId
 * @param expected
 */
const clickAndExpect = async (
    clickId: string,
    valueId: string,
    expected: string
) => {
    const user = userEvent.setup();
    const clickElement = screen.getByTestId(clickId);

    await user.click(clickElement);
    await expectValue(valueId, expected);
};

export default clickAndExpect;
