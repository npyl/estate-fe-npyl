// Things to test:
// 1. writing on textfield doesn't kill the whole thing

import { setupUseTranslationMock } from "@/test/mock/useTranslation";
setupUseTranslationMock();

import { fireEvent, screen } from "@testing-library/dom";
import {
    getInputTestId,
    getOptionTestId,
    PRICE_CEILING,
} from "@/ui/Filters/Range";
import { setupUseStatesMock } from "./mock/useStates";
import Tester from "./Tester";
import { render } from "@testing-library/react";
import { act } from "react";
import { formatThousands } from "@/utils/formatNumber";
import toNumberSafe from "@/utils/toNumberSafe";
import "@testing-library/jest-dom";

// --------------------------------------------------------------------------------
//                              Basics
// --------------------------------------------------------------------------------

const onSetMin = jest.fn();
const onSetMax = jest.fn();

const mountTester = () =>
    render(<Tester setMin={onSetMin} setMax={onSetMax} />);

const clickOption = (type: "min" | "max", option: number) => {
    const TEST_ID = getOptionTestId(type, option);
    act(() => {
        screen.getByTestId(TEST_ID).click();
    });
};

// --------------------------------------------------------------------------------
//                Options checks (e.g. is Rent, Sale or both)
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
//                              INPUTS
// --------------------------------------------------------------------------------

const expectInputValue = (type: "min" | "max", value: number) => {
    const container = screen.getByTestId(getInputTestId(type));
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input?.value).toBe(formatThousands(value));
};

const getTypeSteps = (value: number) => {
    const valueStr = value.toString();
    const steps: number[] = [];

    for (let i = 1; i <= valueStr.length; i++) {
        steps.push(parseInt(valueStr.substring(0, i)));
    }

    return steps;
};

const typeStep = (input: HTMLInputElement) => (stepValue: number) => {
    fireEvent.change(input, { target: { value: stepValue } });
};

const typeValue = (type: "min" | "max", value: number) => {
    const container = screen.getByTestId(getInputTestId(type));
    const input = container.querySelector("input") as HTMLInputElement;

    const steps = getTypeSteps(value);

    // Type each step by appending to existing value
    steps.forEach(typeStep(input));
};

// --------------------------------------------------------------------------------
//                                  setters
// --------------------------------------------------------------------------------

const TEST_VALUE_MIN = 10000;
const TEST_VALUE_MAX = 50000;

const setUnconflicting = (
    type: "min" | "max",
    value: number,
    isLast: boolean = false
) => {
    clickOption(type, value);

    const cb = type === "min" ? onSetMin : onSetMax;
    const otherCb = type !== "min" ? onSetMin : onSetMax;

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(value);

    if (isLast) {
        expect(otherCb).toHaveBeenCalledTimes(1);
    } else {
        expect(otherCb).not.toHaveBeenCalled();
    }

    expectInputValue(type, value);
};

const setConflicting = (
    type: "min" | "max",
    value: number,
    isLast: boolean = false
) => {
    clickOption(type, value);

    const cb = type === "min" ? onSetMin : onSetMax;
    const otherCb = type !== "min" ? onSetMin : onSetMax;

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(value);

    if (isLast) {
        expect(otherCb).toHaveBeenCalledTimes(2);
        expect(otherCb).toHaveBeenLastCalledWith(undefined);
    } else {
        expect(otherCb).not.toHaveBeenCalled();
    }
};

// --------------------------------------------------------------------------------

beforeAll(() => {
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

            // click a min option which is *actually* smaller than the max
            setUnconflicting("min", TEST_VALUE_MIN);

            // click a max option which is *actually* bigger than the min
            setUnconflicting("max", TEST_VALUE_MAX, true);
        });
        it("setMax -> setMin", () => {
            mountTester();

            // click a max option which is *actually* bigger than the min
            setUnconflicting("max", TEST_VALUE_MAX);

            // click a min option which is *actually* smaller than the max
            setUnconflicting("min", TEST_VALUE_MIN, true);
        });

        it("typeMin -> typeMax", () => {});
        it("typeMax -> typeMin", () => {});
    });

    describe("conflicting", () => {
        it("setMin -> setMax", () => {
            mountTester();

            // click a min option which is bigger than the max; conflict!
            setConflicting("min", TEST_VALUE_MAX);

            // click a max option which is smaller than the min; conflict!
            setConflicting("max", TEST_VALUE_MIN, true);
        });
        it("setMax -> setMin", () => {
            mountTester();

            // click a max option which is smaller than the min; conflict!
            setConflicting("max", TEST_VALUE_MIN);

            // click a min option which is bigger than the max; conflict!
            setConflicting("min", TEST_VALUE_MAX, true);
        });

        it("typeMin -> typeMax", () => {});
        it("typeMax -> typeMin", () => {});
    });

    describe("safety", () => {
        const iPRICE_CEILING = toNumberSafe(PRICE_CEILING);

        it("below max value", () => {
            mountTester();
            typeValue("min", iPRICE_CEILING);
            expectInputValue("min", iPRICE_CEILING);
        });
        it("above max value", () => {
            mountTester();
            typeValue("min", iPRICE_CEILING * 1000);
            expectInputValue("min", iPRICE_CEILING);
        });
    });
});
