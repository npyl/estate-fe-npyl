import { render, screen } from "@testing-library/react";
import Tester, {
    ENABLE_DYNAMIC_BUTTON_ID,
    SUBMIT_ID,
    // ...
    VALUES0,
    VALUES1,
} from "./index.comp";
import userEvent from "@testing-library/user-event";

// ----------------------------------------------------------------------------------

const t = (s: any) => s;

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t,
    }),
}));

// ----------------------------------------------------------------------------------

jest.mock("@/services/user", () => ({
    useAllUsersQuery: () => ({
        data: [],
    }),
}));

// ----------------------------------------------------------------------------------

const clickDynamic = () =>
    userEvent.click(screen.getByTestId(ENABLE_DYNAMIC_BUTTON_ID));

const clickSubmit = () => userEvent.click(screen.getByTestId(SUBMIT_ID));

const expectSubmitData = (VALUES: any) => (d: any) =>
    expect(d).toStrictEqual(VALUES);

describe("hook-form (dynamic)", () => {
    test("before", async () => {
        render(<Tester onSubmit={expectSubmitData(VALUES0)} />);
        await clickSubmit();
    });
    test("after", async () => {
        render(<Tester onSubmit={expectSubmitData(VALUES1)} />);
        await clickDynamic();
        await clickSubmit();
    });
});
