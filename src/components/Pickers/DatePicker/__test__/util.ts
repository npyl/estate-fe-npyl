import { EUROPEAN_DATE_FORMAT } from "@/constants/datepicker";
import { screen } from "@testing-library/react";
import dayjs from "dayjs";
import { act } from "react";

/**
 * Visible date format must be european (dd/mm/yyyy)
 */
const expectInputDate = (DATEPICKER_TESTID: string, DATE: string) => {
    const input = screen.getByTestId(DATEPICKER_TESTID) as HTMLInputElement;
    expect(input.value).toBe(dayjs(DATE).format(EUROPEAN_DATE_FORMAT));
};

/**
 * Opens the datepicker and clicks on an available day that meets the following criteria:
 * - Not disabled
 * - Within the current week (relative to DATE)
 * - Not the same day as DATE
 *
 * @param d - The DATE (eg. today)
 * @returns The date that was clicked
 * @throws If no day matching the criteria is found
 */
const clickAvailableDay = async (DATE: string) => {
    // Open the datepicker by clicking the calendar button
    const calendarButton = screen.getByRole("button", { name: /choose date/i });
    act(() => calendarButton.click());

    // Wait for the calendar popover to open and render the day cells
    const gridCells = await screen.findAllByRole("gridcell");

    const currentDate = dayjs(DATE);
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = currentDate.endOf("week");

    // Find all available day buttons matching our criteria
    const availableDays = gridCells.filter((button) => {
        if (button.hasAttribute("disabled")) return false;

        const timestamp = button.getAttribute("data-timestamp");
        if (!timestamp) return false;

        const buttonDate = dayjs(parseInt(timestamp));

        // Check if within current week and not the same as DATE
        return (
            buttonDate.isAfter(startOfWeek.subtract(1, "day")) &&
            buttonDate.isBefore(endOfWeek.add(1, "day")) &&
            !buttonDate.isSame(currentDate, "day")
        );
    });

    if (availableDays.length === 0) {
        throw new Error("No available day found matching the criteria");
    }

    const selectedButton = availableDays[0];
    const timestamp = selectedButton.getAttribute("data-timestamp");
    const clickedDate = dayjs(parseInt(timestamp!));

    act(() => selectedButton.click());

    return clickedDate.toISOString();
};

export { expectInputDate, clickAvailableDay };
