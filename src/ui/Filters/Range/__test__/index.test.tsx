// Things to test:
// 1. writing on textfield doesn't kill the whole thing
// 2. isNothing -> show SALE-related
//    isRent -> show RENT(or RENTED)-related
//    isSale -> show SALE-related
//    isRent & isSale -> show RENT,SALE-related

import { screen } from "@testing-library/dom";
import { getOptionTestId } from "@/ui/Filters/Range";
import { setupUseStatesMock } from "./mock/useStates";
import { setupUseTranslationMock } from "@/test/mock/useTranslation";
import Tester from "./Tester";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// --------------------------------------------------------------------------------

const onSetMin = jest.fn();
const onSetMax = jest.fn();

const mountTester = () =>
    render(<Tester setMin={onSetMin} setMax={onSetMax} />);

const clickOption = (type: "min" | "max", option: number) => {
    const TEST_ID = getOptionTestId(type, option);
    screen.getByTestId(TEST_ID).click();
};

// --------------------------------------------------------------------------------

const expectOptions = (INITIAL_VALUE: number, STEP: number) => {
    const OPTION0 = getOptionTestId("min", INITIAL_VALUE);
    const OPTION1 = getOptionTestId("min", INITIAL_VALUE + STEP);
    expect(screen.getByTestId(OPTION0)).toBeInTheDocument();
    expect(screen.getByTestId(OPTION1)).toBeInTheDocument();
};

const expectRentOptions = () => {
    const INITIAL_VALUE = 100;
    const STEP = 100;
    expectOptions(INITIAL_VALUE, STEP);
};

// +10.000, +20.000, etc.
const expectSaleOptions = () => {
    const INITIAL_VALUE = 10000;
    const STEP = 10000;
    expectOptions(INITIAL_VALUE, STEP);
};

// --------------------------------------------------------------------------------

const TEST_VALUE_MIN = 10000;
const TEST_VALUE_MAX = 50000;

beforeAll(() => {
    setupUseTranslationMock();
    setupUseStatesMock([]);
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe("RangeSelect", () => {
    describe("options", () => {
        it("nothing", () => {
            mountTester();
            // INFO: sale by default
            expectSaleOptions();
        });

        describe("rent", () => {
            it("rent", () => {
                setupUseStatesMock(["RENT"]);
                mountTester();
                expectRentOptions();
            });

            it("rented", () => {
                setupUseStatesMock(["RENTED"]);
                mountTester();
                expectRentOptions();
            });
        });

        it("sale", () => {
            setupUseStatesMock(["SOLD"]);
            mountTester();
            expectSaleOptions();
        });

        it("sale & rent", () => {
            setupUseStatesMock(["RENT", "SOLD"]);
            mountTester();
            expectRentOptions();
            expectSaleOptions();
        });
    });

    describe("unconflicting", () => {
        it("setMin -> setMax", () => {
            mountTester();
            clickOption("min", TEST_VALUE_MIN);
            expect(onSetMin).toHaveBeenCalledTimes(1);
            expect(onSetMin).toHaveBeenCalledWith(TEST_VALUE_MIN);
            expect(onSetMax).not.toHaveBeenCalled();

            clickOption("max", TEST_VALUE_MAX);
            expect(onSetMax).toHaveBeenCalledTimes(1);
            expect(onSetMax).toHaveBeenCalledWith(TEST_VALUE_MAX);
            expect(onSetMin).toHaveBeenCalledTimes(1);
        });
        it("setMax -> setMin", () => {
            mountTester();

            clickOption("max", TEST_VALUE_MAX);
            expect(onSetMax).toHaveBeenCalledTimes(1);
            expect(onSetMax).toHaveBeenCalledWith(TEST_VALUE_MAX);
            expect(onSetMin).not.toHaveBeenCalled();

            clickOption("min", TEST_VALUE_MIN);
            expect(onSetMin).toHaveBeenCalledTimes(1);
            expect(onSetMin).toHaveBeenCalledWith(TEST_VALUE_MIN);
            expect(onSetMax).toHaveBeenCalledTimes(1);
        });

        it("typeMin", () => {});
        it("typeMax", () => {});
    });

    describe("conflicting", () => {
        it("setMin -> setMax", () => {
            mountTester();

            clickOption("min", TEST_VALUE_MAX);
            expect(onSetMin).toHaveBeenCalledTimes(1);
            expect(onSetMin).toHaveBeenCalledWith(TEST_VALUE_MAX);
            expect(onSetMax).not.toHaveBeenCalled();

            clickOption("max", TEST_VALUE_MIN);
            expect(onSetMax).toHaveBeenCalledTimes(1);
            expect(onSetMax).toHaveBeenCalledWith(TEST_VALUE_MIN);

            // TODO: this does not work
            // expect(onSetMin).toHaveBeenCalledTimes(2);
            // expect(onSetMin).toHaveBeenLastCalledWith(undefined);
        });
        it("setMax -> setMin", () => {
            mountTester();

            clickOption("max", TEST_VALUE_MIN);
            expect(onSetMax).toHaveBeenCalledTimes(1);
            expect(onSetMax).toHaveBeenCalledWith(TEST_VALUE_MIN);
            expect(onSetMin).not.toHaveBeenCalled();

            clickOption("min", TEST_VALUE_MAX);
            expect(onSetMin).toHaveBeenCalledTimes(1);
            expect(onSetMin).toHaveBeenCalledWith(TEST_VALUE_MAX);

            // TODO: this does not work
            // expect(onSetMax).toHaveBeenCalledTimes(2);
            // expect(onSetMax).toHaveBeenLastCalledWith(undefined);
        });
        it("typeMin", () => {});
        it("typeMax", () => {});
    });

    describe("safety", () => {
        it("above max value", () => {});
    });
});
