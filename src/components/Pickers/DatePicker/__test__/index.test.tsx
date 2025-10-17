import { setupUseTranslationMock } from "@/test/mock/useTranslation";
setupUseTranslationMock();

import { render } from "@testing-library/react";
import Tester from "./Tester";
import { DatePickerProps } from "@/components/Pickers/DatePicker";
import dayjs from "dayjs";
import { clickAvailableDay, expectInputDate } from "./util";
import toLocalDate from "@/utils/toLocalDate";

// ----------------------------------------------------------------------------------

const DATEPICKER_TESTID = "datepicker-testid";

const renderTester = (props: DatePickerProps) =>
    render(<Tester data-testid={DATEPICKER_TESTID} {...props} />);

const renderLocalDateTester = (props: Omit<DatePickerProps, "localDate">) =>
    renderTester({ localDate: true, ...props });

const renderISOTester = (props: Omit<DatePickerProps, "localDate">) =>
    renderTester({ localDate: false, ...props });

// ----------------------------------------------------------------------------------

const DATE = dayjs().toISOString();

// ----------------------------------------------------------------------------------

const onChangeCb = jest.fn();

const expectOnChangeWith = (v: string) =>
    expect(onChangeCb).toHaveBeenCalledWith(v);

describe("DatePicker", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("LocalDate", () => {
        it("initialValues", () => {
            renderLocalDateTester({ value: DATE });
            expectInputDate(DATEPICKER_TESTID, DATE);
        });
        it("onChange", async () => {
            renderLocalDateTester({ onChange: onChangeCb });
            const clickedDate = await clickAvailableDay(DATE);
            expectInputDate(DATEPICKER_TESTID, clickedDate);
            expectOnChangeWith(toLocalDate(clickedDate));
        });
    });
    describe("ISO Date", () => {
        it("initialValues", () => {
            renderISOTester({ value: DATE });
            expectInputDate(DATEPICKER_TESTID, DATE);
        });

        it("onChange", async () => {
            renderISOTester({ onChange: onChangeCb });
            const clickedDate = await clickAvailableDay(DATE);
            expectInputDate(DATEPICKER_TESTID, clickedDate);
            expectOnChangeWith(clickedDate);
        });
    });
});
