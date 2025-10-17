import { render, screen } from "@testing-library/react";
import Tester, { TesterProps } from "./Tester";
import dayjs from "dayjs";
import { DATEPICKER_TESTID } from "./Tester/constants";
import { EUROPEAN_DATE_FORMAT } from "@/constants/datepicker";

// ----------------------------------------------------------------------------------

const renderTester = (props: TesterProps) => render(<Tester {...props} />);

const renderLocalDateTester = (props: Omit<TesterProps, "localDate">) =>
    renderTester({ localDate: true, ...props });

const renderISOTester = (props: Omit<TesterProps, "localDate">) =>
    renderTester({ localDate: false, ...props });

// ----------------------------------------------------------------------------------

const DATE = dayjs().toISOString();

/**
 * Visible date format must be european (dd/mm/yyyy)
 */
const expectInputDate = () => {
    const input = screen.getByTestId(DATEPICKER_TESTID) as HTMLInputElement;
    expect(input.value).toBe(dayjs(DATE).format(EUROPEAN_DATE_FORMAT));
};
// ----------------------------------------------------------------------------------

describe("DatePicker", () => {
    describe("LocalDate", () => {
        it("initialValues", () => {
            renderLocalDateTester({ formValues: { myDate: DATE } });
            expectInputDate();
        });
    });
    describe("ISO Date", () => {
        it("initialValues", () => {
            renderISOTester({ formValues: { myDate: DATE } });
            expectInputDate();
        });
    });
});
