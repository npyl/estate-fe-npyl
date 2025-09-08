import { setupUseRouterMock } from "@/test/mock/useRouter";
import { render, screen } from "@testing-library/react";
import Tester, {
    PAYLOAD_TESTID,
    STORAGE_KEY,
    SUBMIT_ID,
    Values,
} from "./index.comp";
import { PropsWithoutDefaultValues } from "@/components/hook-form/useFormPersist";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { getVersioned } from "@/hooks/useVersioned";
import { setupUseTranslationMock } from "@/test/mock/useTranslation";

const COOKIE_VALUES: Values = {
    something: "test-cookie",
};
const PROPS_VALUES: Values = {
    something: "test-props-value",
};

// ----------------------------------------------------------------------------

const renderTester = (formProps: PropsWithoutDefaultValues<Values>) =>
    render(<Tester formProps={formProps} />);

const clickSubmit = async () => {
    const user = userEvent.setup();
    await user.click(screen.getByTestId(SUBMIT_ID));
};

const expectPayload = async (expected: string) => {
    const payload = screen.getByTestId(PAYLOAD_TESTID).textContent;
    expect(payload).toBe(expected);
};

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

    // describe("onSaveSuccess", () => {
    //     it("ret. false", () => {});
    //     it("ret. true", () => {});
    // });

    // it("disablePersist", () => {});

    // it("isDirty", () => {});

    // it("persistNotice", () => {});

    // it("persistChanges", () => {})
});
