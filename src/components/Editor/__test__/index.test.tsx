import { render, screen } from "@testing-library/react";
import Tester from "./index.comp";
import plainTextToJSON from "../util/plainText2JSON";
import { TESTS } from "../util/plainText2JSON/__test__/constants";
import { EDITOR_CONTENT_ID, EditorProps } from "@/components/Editor";
import "@testing-library/jest-dom";

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

function MockedButtonBase({ children, onClick, ...props }: any) {
    return (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    );
}

jest.mock("@mui/material/ButtonBase", () => MockedButtonBase);

jest.mock("@mui/material/IconButton", () => {
    return function MockedIconButton({
        children,
        onClick,
        disabled,
        ...props
    }: any) {
        // Filter out MUI-specific props that shouldn't be passed to DOM elements
        const {
            centerRipple,
            focusRipple,
            disableRipple,
            disableFocusRipple,
            disableTouchRipple,
            focusVisibleClassName,
            TouchRippleProps,
            ...domProps
        } = props;

        return (
            <button onClick={onClick} disabled={disabled} {...domProps}>
                {children}
            </button>
        );
    };
});

jest.mock("next/dynamic", () => {
    return () => {
        return function MockDynamicComponent(props: any) {
            return <div />;
        };
    };
});

const renderTester = (props: EditorProps) => render(<Tester {...props} />);

describe("Editor", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Content passed should be content we see in html
    it("content", () => {
        const input = TESTS[1].input;
        const content = plainTextToJSON(input);
        renderTester({ content });
        const output = screen.getByTestId(EDITOR_CONTENT_ID).textContent;
        const expected = input.replaceAll(/\n/g, "");
        expect(output).toBe(expected);
    });

    describe("update", () => {
        it("onUpdate", async () => {});
        it("onUpdate (HTML)", async () => {});
        it("onPlainTextUpdate", async () => {});
    });
});
