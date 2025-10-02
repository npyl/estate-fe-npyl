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
        it("nothing", () => {});
        it("rent", () => {});
        it("sale", () => {});
        it("sale & rent", () => {});
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
        it("clearMin", () => {});
        it("clearMax", () => {});
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
        it("clearMin", () => {});
        it("clearMax", () => {});
    });

    describe("safety", () => {
        it("above max value", () => {});
    });
});
