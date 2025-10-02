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

// --------------------------------------------------------------------------------

const onSetMin = jest.fn();
const onSetMax = jest.fn();

const mountTester = () =>
    render(<Tester setMin={onSetMin} setMax={onSetMax} />);

const clickOption = (type: "min" | "max", option: number) => {
    const TEST_ID = getOptionTestId(type, option);
    screen.getByTestId(TEST_ID).click();
};

const evaluate = (type: "min" | "max", value: string | number) => {
    const cb = type === "min" ? onSetMin : onSetMax;
    const otherCb = type === "min" ? onSetMax : onSetMin;

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(value);
    expect(otherCb).not.toHaveBeenCalled();
};

// --------------------------------------------------------------------------------

describe("RangeSelect", () => {
    beforeAll(() => {
        setupUseTranslationMock();
        setupUseStatesMock([]);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("options", () => {
        it("nothing", () => {});
        it("rent", () => {});
        it("sale", () => {});
        it("sale & rent", () => {});
    });

    describe("unconflicting", () => {
        it("setMin", () => {
            const TEST_VALUE = 10000;

            mountTester();
            clickOption("min", TEST_VALUE);
            evaluate("min", TEST_VALUE);
        });
        it("setMax", () => {});
        it("typeMin", () => {});
        it("typeMax", () => {});
        it("clearMin", () => {});
        it("clearMax", () => {});
    });

    describe("conflicting", () => {
        it("setMin", () => {});
        it("setMax", () => {});
        it("typeMin", () => {});
        it("typeMax", () => {});
        it("clearMin", () => {});
        it("clearMax", () => {});
    });

    describe("safety", () => {
        it("above max value", () => {});
    });
});
