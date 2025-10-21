import Tester, {
    COOKIE_REMOVE_ID,
    cookieName,
    SET_CALLBACK_ID,
    SET_DIRECT_ID,
    SET_MULTIPLE_ID,
    VALUE_ID,
} from "./index.comp";
import clickAndExpectOrg from "@/test/clickAndExpect";
import { render, screen } from "@testing-library/react";
import { parseCookies, initialiseCookie } from "@/test/cookies";
import { getVersioned } from "@/hooks/useVersioned";

/**
 * Check actual cookie value (stored in document.cookie for Jest)
 * @param cookieName - The name of the cookie to check
 * @param content - Expected content value
 */
const expectCookie = (cookieName: string, expected: string | undefined) => {
    const cookies = parseCookies();

    if (expected === undefined) {
        expect(cookies[cookieName]).toBeUndefined();
        return;
    }

    const expectedJson = JSON.stringify(getVersioned(1, expected));
    const actualCookieValue = cookies[cookieName];

    expect(actualCookieValue).toBe(expectedJson);
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

    expectCookie(cookieName, expected);
};

/**
 * Checks state initial value
 */
const checkInitial = () => {
    const valueLocator = screen.getByTestId(VALUE_ID);
    expect(valueLocator).toHaveTextContent("initial");
};

describe("useCookie", () => {
    beforeEach(() => {
        initialiseCookie();
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

        await clickAndExpect(COOKIE_REMOVE_ID, VALUE_ID, undefined, "initial");
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
        await clickAndExpect(COOKIE_REMOVE_ID, VALUE_ID, undefined, "initial");

        // re-set (direct) after cookie removal
        await clickAndExpect(SET_DIRECT_ID, VALUE_ID, "direct update");
    });
});
