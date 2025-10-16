import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react";
import Tester from "./Tester";
import { END_DATE_TESTID, START_DATE_TESTID } from "./Tester/constants";
import { START_HOUR, END_HOUR } from "@/constants/calendar";
import {
    DATEPICKER_TESTID,
    END_TIME_PICKER_TESTID,
    START_TIME_PICKER_TESTID,
    // ...
    ALL_DAY_CHECKBOX_TESTID,
} from "../EventDates/constants";
import "@testing-library/jest-dom";
import { getOptionTestId } from "@/components/Pickers/TimePicker";

// ----------------------------------------------------------------------------------

const getStartEndDates = (startHour: number, endHour: number) => {
    const startDate = new Date("2025-10-08");
    startDate.setHours(startHour, 0, 0, 0);

    const endDate = new Date("2025-10-08");
    endDate.setHours(endHour, 0, 0, 0);

    return [startDate.toISOString(), endDate.toISOString()];
};

const getNotAllDay = () => getStartEndDates(START_HOUR, START_HOUR + 1);

const getAllDay = () => getStartEndDates(START_HOUR, END_HOUR);

// Mock translation
jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { language: "en" },
    }),
}));

// -----------------------------------------------------------------------------------

const expectValues = (s0: string, s1: string) => {
    const startDate = screen.getByTestId(START_DATE_TESTID);
    const endDate = screen.getByTestId(END_DATE_TESTID);
    expect(startDate).toHaveTextContent(s0);
    expect(endDate).toHaveTextContent(s1);
};

const expectInputHourValues = (s0: number, s1: number) => {
    const startDate = screen.getByTestId(START_DATE_TESTID).textContent;
    const s = startDate ? new Date(startDate).getHours() : -1;

    const endDate = screen.getByTestId(END_DATE_TESTID).textContent;
    const e = endDate ? new Date(endDate).getHours() : -1;

    expect(s).toBe(s0);
    expect(e).toBe(s1);
};

const expectIsAllDayLayout = () => {
    const EL3 = screen.queryByTestId(DATEPICKER_TESTID);
    const EL0 = screen.queryByTestId(START_TIME_PICKER_TESTID);
    const EL1 = screen.queryByTestId(END_TIME_PICKER_TESTID);

    // Expect START, END time pickers to not be present
    expect(EL0).toBe(null);
    expect(EL1).toBe(null);

    // ...
    expect(EL3).toBeInTheDocument();
};

const expectIsNotAllDayLayout = () => {
    const EL3 = screen.getByTestId(DATEPICKER_TESTID);
    const EL0 = screen.getByTestId(START_TIME_PICKER_TESTID);
    const EL1 = screen.getByTestId(END_TIME_PICKER_TESTID);

    // Expect START, END time pickers to *BE* present
    expect(EL0).toBeInTheDocument();
    expect(EL1).toBeInTheDocument();

    // ...
    expect(EL3).toBeInTheDocument();
};

// -----------------------------------------------------------------------------------

const openSelect = async (testId: string) => {
    const selectElement = screen.getByTestId(testId);
    const selectButton = selectElement.querySelector('[role="combobox"]');

    if (!selectButton) {
        throw new Error(`Could not find select button for ${testId}`);
    }

    // Use fireEvent.mouseDown which is what MUI Select listens for
    fireEvent.mouseDown(selectButton);

    // Wait for the menu to appear
    await waitFor(() => {
        expect(screen.getByRole("listbox")).toBeInTheDocument();
    });
};

// -----------------------------------------------------------------------------------

const clickStartTimePicker = () => openSelect(START_TIME_PICKER_TESTID);
const clickEndTimePicker = () => openSelect(END_TIME_PICKER_TESTID);

const clickTimeOption = (...args: Parameters<typeof getOptionTestId>) =>
    act(() => screen.getByTestId(getOptionTestId(...args)).click());

const clickAllDayCheckboxAndExpect = (s0: string, s1: string) => {
    act(() => screen.getByTestId(ALL_DAY_CHECKBOX_TESTID).click());
    expectValues(s0, s1);
};

// -----------------------------------------------------------------------------------

describe("RHFEventDates", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("initial values", () => {
        it("nothing", () => {
            render(<Tester />);
            expectValues("", "");
        });
        it("not all day", () => {
            const [startDate, endDate] = getNotAllDay();
            render(<Tester startDate={startDate} endDate={endDate} />);
            expectIsNotAllDayLayout();
        });
        it("all day", () => {
            const [startDate, endDate] = getAllDay();
            render(<Tester startDate={startDate} endDate={endDate} />);
            expectIsAllDayLayout();
        });
    });

    describe("flows", () => {
        it("notAllDay -> allDay", () => {
            const [start0, end0] = getNotAllDay();
            render(<Tester startDate={start0} endDate={end0} />);
            expectIsNotAllDayLayout();

            const [start1, end1] = getAllDay();
            clickAllDayCheckboxAndExpect(start1, end1);
            expectIsAllDayLayout();
        });
        it("allDay -> notAllDay", () => {
            const [start0, end0] = getAllDay();
            render(<Tester startDate={start0} endDate={end0} />);
            expectIsAllDayLayout();

            const [start1, end1] = getNotAllDay();
            clickAllDayCheckboxAndExpect(start1, end1);
            expectIsNotAllDayLayout();
        });
    });

    describe("flows2", () => {
        it("startHour > endHour", async () => {
            const [start0, end0] = getStartEndDates(9, 10);
            render(<Tester startDate={start0} endDate={end0} />);

            await clickStartTimePicker();
            clickTimeOption(11, 0, "am", START_TIME_PICKER_TESTID);

            expectInputHourValues(11, END_HOUR);
        });
        it("endHour < startHour", async () => {
            const [start0, end0] = getStartEndDates(10, 11);
            render(<Tester startDate={start0} endDate={end0} />);

            await clickEndTimePicker();
            clickTimeOption(9, 0, "am", END_TIME_PICKER_TESTID);

            expectInputHourValues(START_HOUR, 9);
        });
    });
});
