import { act, render, screen } from "@testing-library/react";
import Tester from "./Tester";
import { END_DATE_TESTID, START_DATE_TESTID } from "./Tester/constants";
import { START_HOUR, END_HOUR } from "@/constants/calendar";
import {
    DATEPICKER_TESTID,
    END_TIME_PICKER_TESTID,
    START_TIME_PICKER_TESTID,
    // ...
    ALL_DAY_CHECKBOX_TESTID,
    ALL_DAY_DATEPICKER_TESTID,
} from "../EventDates/constants";
import "@testing-library/jest-dom";

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

const expectIsAllDayLayout = () => {
    const EL3 = screen.queryByTestId(DATEPICKER_TESTID);
    const EL0 = screen.queryByTestId(START_TIME_PICKER_TESTID);
    const EL1 = screen.queryByTestId(END_TIME_PICKER_TESTID);

    const EL2 = screen.getByTestId(ALL_DAY_DATEPICKER_TESTID);

    // Expect START, END time pickers to not be present
    expect(EL0).toBe(null);
    expect(EL1).toBe(null);

    // ...
    expect(EL2).toBeInTheDocument();
    expect(EL3).toBe(null);
};

const expectIsNotAllDayLayout = () => {
    const EL3 = screen.getByTestId(DATEPICKER_TESTID);
    const EL0 = screen.getByTestId(START_TIME_PICKER_TESTID);
    const EL1 = screen.getByTestId(END_TIME_PICKER_TESTID);

    const EL2 = screen.queryByTestId(ALL_DAY_DATEPICKER_TESTID);

    // Expect START, END time pickers to *BE* present
    expect(EL0).toBeInTheDocument();
    expect(EL1).toBeInTheDocument();

    // ...
    expect(EL2).toBe(null);
    expect(EL3).toBeInTheDocument();
};

// -----------------------------------------------------------------------------------

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
});
