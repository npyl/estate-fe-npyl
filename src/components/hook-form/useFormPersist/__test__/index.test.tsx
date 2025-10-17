import { setupUseRouterMock } from "@/test/mock/useRouter";
import { setupUseTranslationMock } from "@/test/mock/useTranslation";

setupUseTranslationMock();
setupUseRouterMock();

import { act, fireEvent, render, screen } from "@testing-library/react";
import Tester, {
    DIRTY_TESTID,
    DIRTY_YES,
    FIELD_TESTID,
    PAYLOAD_TESTID,
    PERSIST_TESTID,
    STORAGE_KEY,
    SUBMIT_ID,
    TesterConfig,
    Values,
} from "./index.comp";
import { PropsWithoutDefaultValues } from "@/components/hook-form/useFormPersist";
import { getVersioned, TVersioned } from "@/hooks/useVersioned";
import uuidv4 from "@/utils/uuidv4";
import { PERSIST_NOTICE_TESTID } from "../constant";
import triggerEvent from "@/components/hook-form/useFormPersist/useUnsavedWatcher/triggerEvent";
import sleep from "@/utils/sleep";
import "@testing-library/jest-dom";

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
    await act(async () => screen.getByTestId(SUBMIT_ID).click());
};

const expectPayload = async (expected: string) => {
    const payload = screen.getByTestId(PAYLOAD_TESTID).textContent;
    expect(payload).toBe(expected);
};

const expectPersistNotice = () =>
    expect(screen.getByTestId(PERSIST_NOTICE_TESTID)).toBeVisible();

// ----------------------------------------------------------------------------

/**
 * Set storage item (STORAGE_KEY) with COOKIE_VALUES as content
 */
const setValuesToStorage = () =>
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(getVersioned(1, COOKIE_VALUES))
    );

const clearStorage = () => localStorage.clear();

/**
 * @returns expect() object for the value of the storage item (STORAGE_KEY)
 */
const expectStorageValue = () => {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return null;
    const content = JSON.parse(item) as TVersioned<Values>;
    return expect(content.content.something);
};

/**
 * Fill an input with a random value
 */
const fillInput = (inputId: string) => {
    const field = screen.getByTestId(inputId);
    const input = field.querySelector("input");
    if (!input) throw new Error("Bad input");
    const value = uuidv4();
    fireEvent.change(input, { target: { value } });
    return value;
};

// ----------------------------------------------------------------------------

const clickPersistChanges = () =>
    act(() => screen.getByTestId(PERSIST_TESTID).click());

// ----------------------------------------------------------------------------

describe("useFormPersist", () => {
    beforeEach(() => {
        clearStorage();
    });

    describe("Basic Flows", () => {
        it("interruption (e.g. redirect) & recovery of form", async () => {
            // 1: load form
            setValuesToStorage();
            renderTester({});

            // 1.1: register event listener spy
            const addEventListenerSpy = jest.spyOn(
                globalThis.window,
                "addEventListener"
            );

            // 2: fill in input
            const value = fillInput(FIELD_TESTID);

            // 3: simulate unsaved changes event
            triggerEvent(addEventListenerSpy, "beforeunload");

            await sleep(1000);

            // 4: Expect storage item value
            const expect = expectStorageValue();
            if (!expect) throw new Error("Bad expect");
            expect.toBe(value);

            // 5. Cleanup
            addEventListenerSpy.mockRestore();
        });

        it("saving of changes & removal of storage item", async () => {
            renderTester({}, { onSubmitRet: true });
            await clickSubmit();
            const ret = expectStorageValue();
            expect(ret).toBe(null);
        });
    });

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
            setValuesToStorage();
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
            setValuesToStorage();
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

    describe("isDirty", () => {
        const expectDirty = () => {
            const dirtyContent = screen.getByTestId(DIRTY_TESTID).textContent;
            expect(dirtyContent).toBe(DIRTY_YES);
        };

        it("field change", () => {
            renderTester({});
            fillInput(FIELD_TESTID);
            expectDirty();
        });
        it("w/ cookie", () => {
            setValuesToStorage();
            renderTester({});
            expectDirty();
        });
    });

    it("persistNotice", () => {
        setValuesToStorage();
        renderTester({});
        expectPersistNotice();
    });

    it("persistChanges", async () => {
        // Render form
        setValuesToStorage();
        renderTester({});

        // Change field value
        const value = fillInput(FIELD_TESTID);

        // Force on-demand persist
        clickPersistChanges();

        // Expect storage item value
        const expect = expectStorageValue();
        if (!expect) throw new Error("Bad expect");
        expect.toBe(value);
    });
});
