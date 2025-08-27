import Tester, {
    itemName,
    INITIAL,
    // ...
    ITEM_REMOVE_ID,
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
    // ...
    SET_DIRECT_ID_EVENT,
    SET_CALLBACK_ID_EVENT,
    SET_MULTIPLE_ID_EVENT,
    ITEM_REMOVE_ID_EVENT,
} from "./index.comp";
import clickAndExpectOrg from "@/test/clickAndExpect";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

const clearLocalStorage = () => {
    window.localStorage.clear();
};

/**
 * Check actual localStorage item value (Jest version)
 * @param value - Expected value or undefined if item should be removed
 */
const expectItem = (value?: string) => {
    // Access localStorage directly (works with jsdom environment)
    const storedValue = window.localStorage.getItem(itemName);

    if (value === undefined) {
        // If we expect no value (item was removed), the localStorage should return null
        expect(storedValue).toBeNull();
    } else {
        // Values in localStorage are JSON-stringified, so we need to parse them
        const parsedObject = storedValue ? JSON.parse(storedValue) : null;

        if (!parsedObject) throw new Error("Found null!");
        if (typeof parsedObject !== "object") throw new Error("Not an object");
        if (!("content" in parsedObject))
            throw new Error("Doesnt contain content field");

        const { content } = parsedObject;

        expect(content).toBe(value);
    }
};

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
    expectItem(expected);
};

/**
 * Checks state initial value
 */
const checkInitial = () => {
    const valueLocator = screen.getByTestId(VALUE_ID);
    expect(valueLocator).toHaveTextContent(INITIAL);
};

describe("useLocalStorage", () => {
    beforeEach(() => {
        clearLocalStorage();
    });

    // ---------------------------------------------------------------------------------------------------
    //          BASIC
    // ---------------------------------------------------------------------------------------------------

    it("DirectUpdate", async () => {
        render(<Tester />);

        // Check initial value
        checkInitial();

        await clickAndExpect(SET_DIRECT_ID, VALUE_ID, "direct update");
    });

    it("UpdateWithCallback", async () => {
        render(<Tester />);

        // Check initial value
        checkInitial();

        await clickAndExpect(
            SET_CALLBACK_ID,
            VALUE_ID,
            "initial with callback"
        );
    });

    it("Multiple", async () => {
        render(<Tester />);

        // Check initial value
        checkInitial();

        await clickAndExpect(SET_MULTIPLE_ID, VALUE_ID, "test then second");
    });

    it("Remove", async () => {
        render(<Tester />);

        // Check initial value
        checkInitial();

        await clickAndExpect(ITEM_REMOVE_ID, VALUE_ID, undefined, "initial");
    });

    // ---------------------------------------------------------------------------------------------------
    //          COMPLEX
    // ---------------------------------------------------------------------------------------------------

    it("Complex", async () => {
        render(<Tester />);

        // Check initial value
        checkInitial();

        // Direct set
        await clickAndExpect(SET_DIRECT_ID, VALUE_ID, "direct update");

        // Callback set
        await clickAndExpect(
            SET_CALLBACK_ID,
            VALUE_ID,
            "direct update with callback"
        );

        // Multiple
        await clickAndExpect(SET_MULTIPLE_ID, VALUE_ID, "test then second");

        // Remove
        await clickAndExpect(ITEM_REMOVE_ID, VALUE_ID, undefined, "initial");

        // re-set (direct) after cookie removal
        await clickAndExpect(SET_DIRECT_ID, VALUE_ID, "direct update");
    });

    // ---------------------------------------------------------------------------------------------------
    //          COMPLEX w/ Events
    // ---------------------------------------------------------------------------------------------------

    it("Complex w/ Events", async () => {
        render(<Tester />);

        // Check initial value
        checkInitial();

        // Direct set
        await clickAndExpect(SET_DIRECT_ID_EVENT, VALUE_ID, "direct update");

        // Callback set
        await clickAndExpect(
            SET_CALLBACK_ID_EVENT,
            VALUE_ID,
            "direct update with callback"
        );

        // Multiple
        await clickAndExpect(
            SET_MULTIPLE_ID_EVENT,
            VALUE_ID,
            "test then second"
        );

        // Remove
        await clickAndExpect(
            ITEM_REMOVE_ID_EVENT,
            VALUE_ID,
            undefined,
            "initial"
        );

        // re-set (direct) after cookie removal
        await clickAndExpect(SET_DIRECT_ID_EVENT, VALUE_ID, "direct update");
    });
});
