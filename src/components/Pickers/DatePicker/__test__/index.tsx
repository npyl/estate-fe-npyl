import { render, screen } from "@testing-library/react";
import Tester from "./Tester";
import { DatePickerProps } from "@/components/Pickers/DatePicker";
import dayjs from "dayjs";

// ----------------------------------------------------------------------------------

const renderTester = (props: DatePickerProps) => render(<Tester {...props} />);

const renderLocalDateTester = (props: Omit<DatePickerProps, "localDate">) =>
    renderTester({ localDate: true, ...props });

const renderISOTester = (props: Omit<DatePickerProps, "localDate">) =>
    renderTester({ localDate: false, ...props });

// ----------------------------------------------------------------------------------

describe("DatePicker", () => {
    describe("LocalDate", () => {
        it("initialValues", () => {
            const DATE = dayjs().toISOString();
            renderLocalDateTester({ value: DATE });
        });
    });
    describe("ISO Date", () => {
        it("initialValues", () => {
            renderISOTester({});
        });
    });
});
