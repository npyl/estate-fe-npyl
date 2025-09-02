import Tester, { VALUE_ID, SELECT_ID } from "./Tester";
import { NOT_SELECTED_TESTID, getOptionTestId } from "../constants";
import { NOT_SELECTED_VALUE } from "../../../../constants/select";
import { OPTIONS } from "./constants";
import { render, screen } from "@testing-library/react";
import clickOptions from "@/test/select/clickOptions";
import { useTranslation } from "react-i18next";

// -------------------------------------------------------------
// Set          - click on an option
// Set other    - click on a different option
// Re-set       - click on a previous option
// Clear        - click on "not-selected" option
// -------------------------------------------------------------
// Testing Set, Set other, Re-set & Clear for all these cases:
// 1. not multiple, not enum (a.k.a. single selection)
// 2. multiple, not enum (a.k.a. multiple)
// 3. not multiple, yes enum
// 4. yes multiple, yes enum

// ----------------------------------------------------------------------------------------

const clickAndExpect = async (OPTION_IDs: string[], value: string) => {
    await clickOptions(SELECT_ID, OPTION_IDs);

    const c = screen.getByTestId(VALUE_ID).textContent;
    expect(c).toBe(value);
};

// ----------------------------------------------------------------------------------------

const t = (s: any) => s;

jest.mock("react-i18next");

const mockUseTranslation = useTranslation as any;

const setupTranslation = () =>
    mockUseTranslation.mockImplementation(
        () =>
            ({
                t,
            }) as any
    );

// ----------------------------------------------------------------------------------------

describe("Select", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        setupTranslation();
    });

    test("Set, Set other & Clear (Single)", async () => {
        render(<Tester />);

        // Set
        const OPTION0 = OPTIONS[0];
        const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
        const EXPECTED0 = JSON.stringify(OPTION0.key);
        await clickAndExpect([OPTION0_TEST_ID], EXPECTED0);

        // Set other
        const OPTION1 = OPTIONS[1];
        const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
        const EXPECTED1 = JSON.stringify(OPTION1.key);
        await clickAndExpect([OPTION1_TEST_ID], EXPECTED1);

        // Clear
        const EXPECTED_CLEAR = JSON.stringify(NOT_SELECTED_VALUE);
        await clickAndExpect([NOT_SELECTED_TESTID], EXPECTED_CLEAR);
    });

    test("Set, Set other, Re-set (Multiple)", async () => {
        render(<Tester multiple />);

        // Set
        const OPTION0 = OPTIONS[0];
        const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
        const EXPECTED0 = JSON.stringify([OPTION0.key]);
        await clickAndExpect([OPTION0_TEST_ID], EXPECTED0);

        // Set other
        const OPTION1 = OPTIONS[1];
        const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
        const EXPECTED1 = JSON.stringify([OPTION0.key, OPTION1.key]);
        await clickAndExpect([OPTION1_TEST_ID], EXPECTED1);

        // Re-set (re-click OPTION1)
        await clickAndExpect([OPTION1_TEST_ID], EXPECTED0);

        // Clear
        await clickAndExpect([NOT_SELECTED_TESTID], JSON.stringify([]));
    });

    test("Set, Set other (Single & Enum)", async () => {
        render(<Tester isEnum />);

        // Set
        const OPTION0 = OPTIONS[0];
        const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
        const EXPECTED0 = JSON.stringify(OPTION0.key);
        await clickAndExpect([OPTION0_TEST_ID], EXPECTED0);

        // Set other
        const OPTION1 = OPTIONS[1];
        const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
        const EXPECTED1 = JSON.stringify(OPTION1.key);
        await clickAndExpect([OPTION1_TEST_ID], EXPECTED1);

        // Clear
        await clickAndExpect([NOT_SELECTED_TESTID], JSON.stringify(null));
    });

    test("Set, Set other, Re-set & Clear (Multiple & Enum)", async () => {
        render(<Tester multiple isEnum />);

        // Set
        const OPTION0 = OPTIONS[0];
        const OPTION0_TEST_ID = getOptionTestId(OPTION0.key);
        const EXPECTED0 = JSON.stringify([OPTION0.key]);
        await clickAndExpect([OPTION0_TEST_ID], EXPECTED0);

        // Set other
        const OPTION1 = OPTIONS[1];
        const OPTION1_TEST_ID = getOptionTestId(OPTION1.key);
        const EXPECTED1 = JSON.stringify([OPTION0.key, OPTION1.key]);
        await clickAndExpect([OPTION1_TEST_ID], EXPECTED1);

        // Re-set (re-click OPTION1)
        await clickAndExpect([OPTION1_TEST_ID], EXPECTED0);

        // Clear
        await clickAndExpect([NOT_SELECTED_TESTID], JSON.stringify([]));
    });
});
