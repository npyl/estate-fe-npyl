import { render } from "@testing-library/react";
import Leveled, {
    TEST_LEVEL2_ID,
    UPDATE_LEVEL2_ID,
    VALUE_LEVEL2_ID,
} from "./Extended.comp";
import clickAndExpectOrg from "@/test/clickAndExpect";

/**
 * Clicks on a button and checks both state and cookie value change
 */
const clickAndExpect = async (
    clickId: string,
    valueId: string,
    // ...
    expected: string | undefined,
    fallback?: string
) => {
    if (!expected && !fallback) throw new Error("Cannot be both undefined");

    // INFO: when cookie is non-existent, the fallback value is expected as of useCookie's behaviour
    const actualExpected = (expected || fallback)!;

    await clickAndExpectOrg(clickId, valueId, actualExpected);

    // TODO: add localStorage check ?
    // await expectItem(page, expected);
};

describe("useLocalStorage", () => {
    it("Levels", async () => {
        render(<Leveled />);

        const EXPECT0 = JSON.stringify([1, 2, 3, 4]);
        const EXPECT1 = JSON.stringify([1, 2, 3, 4, 5]);

        await clickAndExpect(UPDATE_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT0);
        await clickAndExpect(TEST_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT1);
    });
});
