import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

const clickOptions = async (SELECT_ID: string, OPTION_IDs: string[]) => {
    const user = userEvent.setup();

    // Close any open dropdown first by pressing Escape
    await user.keyboard("{Escape}");

    // Small delay to ensure dropdown closes
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Find and click the select element
    const selectElement = screen
        .getByTestId(SELECT_ID)
        .querySelector(".MuiSelect-select");
    if (!selectElement)
        throw new Error(`.MuiSelect-select not found in ${SELECT_ID}`);

    await user.click(selectElement);

    // Wait for the listbox to appear
    await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    // Click each option
    for (const OPTION_ID of OPTION_IDs) {
        const option = screen.getByTestId(OPTION_ID);
        await user.click(option);
    }
};

export default clickOptions;
