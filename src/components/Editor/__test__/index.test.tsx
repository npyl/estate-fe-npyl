import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

// ----------------------------------------------------------------------------------

interface RenderTesterProps extends Omit<EditorProps, "content"> {
    contentRaw: string;
}

const renderTester = ({ contentRaw = "", ...props }: RenderTesterProps) => {
    const content = contentRaw ? plainTextToJSON(contentRaw) : undefined;
    return render(<Tester content={content} {...props} />);
};

/**
 * Expect Editor's content to be the same as input content
 * @param inputContentRaw unformatted string
 */
const expectContent = (inputContentRaw: string) => {
    const output = screen.getByTestId(EDITOR_CONTENT_ID).textContent;
    const expected = inputContentRaw.replaceAll(/\n/g, "");
    expect(output).toBe(expected);
};

// ----------------------------------------------------------------------------------

const getUpdateRes = async (mockOnUpdate: jest.Mock<any, any, any>) => {
    // Wait for the update to be processed
    await waitFor(() => {
        expect(mockOnUpdate).toHaveBeenCalled();
    });

    const lastCall =
        mockOnUpdate.mock.calls[mockOnUpdate.mock.calls.length - 1];

    return lastCall[0];
};

const fillAndExpect = (props: RenderTesterProps, newContentRaw: string) => {
    renderTester(props);

    // Find the actual contenteditable element (the .tiptap div)
    const editorContent = screen.getByTestId(EDITOR_CONTENT_ID);
    const tiptapEditor = editorContent.querySelector(".tiptap");
    if (!tiptapEditor) throw "TipTap not found";
    expect(tiptapEditor).toBeInTheDocument();

    // Focus the editor first
    fireEvent.focus(tiptapEditor);

    // Simulate typing new content
    fireEvent.input(tiptapEditor, {
        target: { textContent: newContentRaw },
    });

    expectContent(newContentRaw);
};

// -----------------------------------------------------------------------------------------

describe("Editor", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("content", () => {
        const contentRaw = TESTS[1].input;
        renderTester({ contentRaw });
        expectContent(contentRaw);
    });

    describe("update", () => {
        it("onUpdate (JSON)", async () => {
            const mockOnUpdate = jest.fn();
            const contentRaw = TESTS[1].input;
            const newContentRaw = "Hello World";

            fillAndExpect(
                { contentRaw, mode: "json", onUpdate: mockOnUpdate },
                newContentRaw
            );

            // Get mockOnUpdate result
            const jsonContent = await getUpdateRes(mockOnUpdate);

            // Verify it's a valid JSON string
            expect(() => JSON.parse(jsonContent)).not.toThrow();

            // Verify the content structure
            const parsedContent = JSON.parse(jsonContent);
            expect(parsedContent).toHaveProperty("type");
            expect(parsedContent).toHaveProperty("content");
        });
        it("onUpdate (HTML)", async () => {
            const mockOnUpdate = jest.fn();
            const contentRaw = TESTS[1].input;
            const newContentRaw = "Hello World";

            fillAndExpect(
                { contentRaw, mode: "html", onUpdate: mockOnUpdate },
                newContentRaw
            );

            // Get mockOnUpdate result
            const htmlContent = await getUpdateRes(mockOnUpdate);
        });
        it("onPlainTextUpdate", async () => {
            const mockOnPlainTextUpdate = jest.fn();
            const contentRaw = TESTS[1].input;
            const newContentRaw = "Hello World";

            fillAndExpect(
                {
                    contentRaw,
                    onPlainTextUpdate: mockOnPlainTextUpdate,
                },
                newContentRaw
            );

            // Get mockOnUpdate result
            const plainText = await getUpdateRes(mockOnPlainTextUpdate);
        });
    });

    describe("mutability", () => {
        it("editable", () => {});
        it("non-editable", () => {});
    });
});
