import { setupUseRouterMock } from "@/test/mock/useRouter";
import { fireEvent, render, screen } from "@testing-library/react";
import Tester, {
    DIRTY_TESTID,
    DIRTY_YES,
    FIELD_TESTID,
    PAYLOAD_TESTID,
    STORAGE_KEY,
    SUBMIT_ID,
    TesterConfig,
    Values,
} from "./index.comp";
import { PropsWithoutDefaultValues } from "@/components/hook-form/useFormPersist";
import userEvent from "@testing-library/user-event";
import { getVersioned } from "@/hooks/useVersioned";
import { setupUseTranslationMock } from "@/test/mock/useTranslation";
import uuidv4 from "@/utils/uuidv4";
import "@testing-library/jest-dom";
import { PERSIST_NOTICE_TESTID } from "../constant";

const COOKIE_VALUES: Values = {
    something: "test-cookie",
};
const PROPS_VALUES: Values = {
    something: "test-props-value",
};

// ----------------------------------------------------------------------------

const renderTester = (
    formProps: PropsWithoutDefaultValues<Values>,
    config?: TesterConfig
) => render(<Tester formProps={formProps} config={config} />);

const clickSubmit = async () => {
    const user = userEvent.setup();
    await user.click(screen.getByTestId(SUBMIT_ID));
};

const expectPayload = async (expected: string) => {
    const payload = screen.getByTestId(PAYLOAD_TESTID).textContent;
    expect(payload).toBe(expected);
};

const expectPersistNotice = () =>
    expect(screen.getByTestId(PERSIST_NOTICE_TESTID)).toBeVisible();

// ----------------------------------------------------------------------------

const initialiseStorage = () => {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(getVersioned(1, COOKIE_VALUES))
    );
};

const clearStorage = () => {
    localStorage.clear();
};

// ----------------------------------------------------------------------------

describe("useFormPersist", () => {
    beforeEach(() => {
        setupUseTranslationMock();
        setupUseRouterMock();
        clearStorage();
    });

    // describe("Basic Flows", () => {});

    describe("Value Priority", () => {
        const expectValues = async (OBJ: object) => {
            await clickSubmit();
            await expectPayload(JSON.stringify(OBJ));
        };

        it("- cookie, - props.value", async () => {
            renderTester({});
            await expectValues({});
        });
        it("+ cookie, - props.value", async () => {
            initialiseStorage();
            renderTester({});
            await expectValues(COOKIE_VALUES);
        });
        it("- cookie, + props.value", async () => {
            renderTester({
                values: PROPS_VALUES,
            });
            await expectValues(PROPS_VALUES);
        });
        it("+ cookie, + props.value", async () => {
            initialiseStorage();
            renderTester({
                values: PROPS_VALUES,
            });
            await expectValues(COOKIE_VALUES);
        });
    });

    describe("onSaveSuccess", () => {
        it("ret. false", async () => {
            const onSaveSuccess = jest.fn();
            renderTester({}, { onSaveSuccess });
            await clickSubmit();
            expect(onSaveSuccess).not.toHaveBeenCalled();
        });
        it("ret. true", async () => {
            const onSaveSuccess = jest.fn();
            renderTester({}, { onSubmitRet: true, onSaveSuccess });
            await clickSubmit();
            expect(onSaveSuccess).toHaveBeenCalled();
        });
    });

    // it("disablePersist", () => {});

    describe("isDirty", () => {
        const expectDirty = () => {
            const dirtyContent = screen.getByTestId(DIRTY_TESTID).textContent;
            expect(dirtyContent).toBe(DIRTY_YES);
        };

        /**
         * Fill an input with a random value
         */
        const fillInput = (inputId: string) => {
            const field = screen.getByTestId(inputId);
            const input = field.querySelector("input");
            if (!input) throw "Bad input";
            fireEvent.change(input, { target: { value: uuidv4() } });
        };

        it("field change", () => {
            renderTester({});
            fillInput(FIELD_TESTID);
            expectDirty();
        });
        it("w/ cookie", () => {
            initialiseStorage();
            renderTester({});
            expectDirty();
        });
    });

    it("persistNotice", () => {
        initialiseStorage();
        renderTester({});
        expectPersistNotice();
    });

    // it("persistChanges", () => {})
});
