import { setupUseTranslationMock } from "@/test/mock/useTranslation";
setupUseTranslationMock();

import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import { DATEPICKER_TESTID, VALUE_TESTID } from "./Tester/constants";
import Tester, { TesterProps } from "./Tester";
import {
    clickAvailableDay,
    expectInputDate,
} from "@/components/Pickers/DatePicker/__test__/util";
import toLocalDate from "@/utils/toLocalDate";

// ----------------------------------------------------------------------------------

const renderTester = (props: TesterProps) => render(<Tester {...props} />);

const renderLocalDateTester = (props: Omit<TesterProps, "localDate">) =>
    renderTester({ localDate: true, ...props });

const renderISOTester = (props: Omit<TesterProps, "localDate">) =>
    renderTester({ localDate: false, ...props });

// ----------------------------------------------------------------------------------

const DATE = dayjs().toISOString();

// ----------------------------------------------------------------------------------

const onChangeCb = jest.fn();

/**
 * <RHFDatePicker /> supports exposing an onChange callback (despite being under RHF) because
 */
const expectOnChangeCalled = () => expect(onChangeCb).toHaveBeenCalledTimes(1);

// ----------------------------------------------------------------------------------

// INFO: these check the <div> that contains the value

const expectISOValue = (d: string) => {
    const v = screen.getByTestId(VALUE_TESTID).textContent;
    expect(v).toBe(d);
};

const expectLocalDateValue = (d: string) => {
    const v = screen.getByTestId(VALUE_TESTID).textContent;
    expect(v).toBe(toLocalDate(d));
};

// ----------------------------------------------------------------------------------

describe("RHFDatePicker", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("LocalDate", () => {
        it("initialValues", () => {
            renderLocalDateTester({
                formValues: { myDate: toLocalDate(DATE) },
            });
            expectInputDate(DATEPICKER_TESTID, DATE);
            expectLocalDateValue(DATE);
        });
        it("onChange", async () => {
            renderLocalDateTester({
                formValues: { myDate: toLocalDate(DATE) },
                onChange: onChangeCb,
            });
            const clickedDate = await clickAvailableDay(DATE);
            expectInputDate(DATEPICKER_TESTID, clickedDate);
            expectLocalDateValue(clickedDate);
            expectOnChangeCalled();
        });
    });
    describe("ISO Date", () => {
        it("initialValues", () => {
            renderISOTester({ formValues: { myDate: DATE } });
            expectInputDate(DATEPICKER_TESTID, DATE);
            expectISOValue(DATE);
        });
        it("onChange", async () => {
            renderISOTester({
                formValues: { myDate: DATE },
                onChange: onChangeCb,
            });
            const clickedDate = await clickAvailableDay(DATE);
            expectInputDate(DATEPICKER_TESTID, clickedDate);
            expectISOValue(clickedDate);
            expectOnChangeCalled();
        });
    });
});
