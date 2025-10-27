import { render, screen } from "@testing-library/react";
import Tester, {
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
    // ...
    TEST_LEVEL2_ID,
    VALUE_LEVEL2_ID,
    UPDATE_LEVEL2_ID,
} from "./index.comp";
import clickAndExpect from "@/test/clickAndExpect";

/**
 * Checks state initial value
 */
const checkInitial = () => {
    const valueLocator = screen.getByTestId(VALUE_ID);
    expect(valueLocator).toHaveTextContent("initial");
};

// ------------------------------------------------------------------------------

describe("useCallbackSetter", () => {
    it("DirectUpdate", async () => {
        render(<Tester />);

        // Check initial value
        checkInitial();

        await clickAndExpect(SET_DIRECT_ID, VALUE_ID, "direct update");
    });

    it("UpdateWithCallback", async () => {
        render(<Tester />);

        checkInitial();

        await clickAndExpect(
            SET_CALLBACK_ID,
            VALUE_ID,
            "initial with callback"
        );
    });

    it("Multiple", async () => {
        render(<Tester />);

        checkInitial();

        await clickAndExpect(SET_MULTIPLE_ID, VALUE_ID, "test then second");
    });

    // -------------------------------------------------------------------------------

    /**
     * This test is for leveled use of useCallbackSetter, for example:
     *
     * // level0
     * const [state, _setState] = useStore();
     * const setState = useCallbackSetter(state, _setState);
     *
     * // level1
     * const level1 = state.something;
     * const _setLevel1 = useCallback((l: ...) => setState((old) => ...), [])
     * const setLevel1 = useCallbackSetter(level1, _setLevel1);
     *
     * It tests for the scenario where a change in level0 is not synced to level1
     */

    it("Levels", async () => {
        render(<Tester />);

        const EXPECT0 = JSON.stringify([1, 2, 3, 4]);
        const EXPECT1 = JSON.stringify([1, 2, 3, 4, 5]);

        await clickAndExpect(UPDATE_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT0);
        await clickAndExpect(TEST_LEVEL2_ID, VALUE_LEVEL2_ID, EXPECT1);
    });

    // -------------------------------------------------------------------------------
});
