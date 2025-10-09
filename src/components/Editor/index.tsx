import {
    Editor as TEditor,
    EditorContent,
    EditorContentProps,
    EditorEvents,
} from "@tiptap/react";
import {
    CSSProperties,
    ForwardedRef,
    forwardRef,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";
import { alpha, SxProps, Theme } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { EditorProvider, useEditorContext } from "./context";
import { debuglog } from "util";
import getBorderColor, { getBorderColor2 } from "@/theme/borderColor";
import { CLASSNAMES } from "./constants";
import { primary } from "@/theme/light-theme-options";
const MenuBar = dynamic(() => import("./MenuBar"), { ssr: false });
const BubbleMenu = dynamic(() => import("./BubbleMenu"));

const EDITOR_CONTENT_ID = "editor-content-testid";

// ----------------------------------------------------------------------

const getMenuBarSx = (editable: boolean): SxProps<Theme> => ({
    borderBottom: editable ? "1px solid" : undefined,
    borderBottomColor: editable ? getBorderColor2 : undefined,
    boxShadow: ({ shadows }) => shadows[3],
});

// ----------------------------------------------------------------------

const useInternalUpdate = (editor: TEditor) => {
    const isInternalUpdate = useRef(false);

    const handleUpdate = useCallback(() => {
        isInternalUpdate.current = true;

        setTimeout(() => {
            isInternalUpdate.current = false;
        }, 50);
    }, []);

    useLayoutEffect(() => {
        editor.on("update", handleUpdate);
        return () => {
            editor.off("update", handleUpdate);
        };
    }, []);

    return isInternalUpdate;
};

/**
 * Support controlled (vs. uncontrolled default) usage with setContent() based on content prop
 * *Only* update content with setContent() when change is not happening from typing...
 */
const useContentUpdate = (editor: TEditor, content: string | undefined) => {
    const isInternalUpdate = useInternalUpdate(editor);

    // Only update content from props if it's not from internal typing
    useEffect(() => {
        if (!content || isInternalUpdate.current) return;

        const parsed = JSON.parseSafe(content);
        if (!parsed) return;

        editor.commands?.setContent(parsed);
    }, [content]);
};

const useForwardEditorRef = (editor: TEditor, ref: ForwardedRef<TEditor>) => {
    useEffect(() => {
        if (typeof ref === "function") {
            ref(editor);
        } else if (ref) {
            ref.current = editor;
        }
    }, []);
};

// ----------------------------------------------------------------------

type EditorRef = TEditor;

type EditorProps = Omit<
    EditorContentProps,
    "editor" | "contentEditable" | "ref" | "onChange"
> & {
    editable?: boolean;
    mode?: "json" | "html";

    containerProps?: Omit<StackProps, "sx">;
    containerSx?: SxProps<Theme>;
    tiptapStyle?: CSSProperties;

    onUpdate?: (s: string) => void;
    onPlainTextUpdate?: (s: string) => void;
};

const Editor = forwardRef<EditorRef, EditorProps>(
    (
        {
            editable = true,
            content,
            // ...
            containerProps,
            containerSx,
            tiptapStyle,
            // ...
            children,
            ...props
        },
        ref
    ) => {
        const { editor } = useEditorContext();

        const menubarRef = useRef<HTMLDivElement>();
        const setMenubarRef = useCallback(
            (e: HTMLDivElement) => (menubarRef.current = e),
            []
        );

        useContentUpdate(editor, content);
        useForwardEditorRef(editor, ref);

        return (
            <Stack
                sx={{
                    "& .tiptap": {
                        height: 1,
                        minHeight: "200px",

                        px: 1.5,

                        ...(!editable
                            ? {
                                  userSelect: "text",
                              }
                            : {}),

                        outline: "none",

                        ...tiptapStyle,
                    },

                    // INFO: along with Indent extension
                    "& [data-indent='1']": { marginLeft: 1 },
                    "& [data-indent='2']": { marginLeft: 2 },
                    "& [data-indent='3']": { marginLeft: 3 },
                    "& [data-indent='4']": { marginLeft: 4 },
                    "& [data-indent='5']": { marginLeft: 5 },
                    "& [data-indent='6']": { marginLeft: 6 },
                    "& [data-indent='7']": { marginLeft: 7 },
                    "& [data-indent='8']": { marginLeft: 8 },

                    // INFO: BlockQuote
                    [`.${CLASSNAMES.BlockQuote}`]: {
                        borderLeft: "3px solid",
                        borderColor: getBorderColor,
                        color: "text.secondary",
                        marginX: 0.5,
                        paddingLeft: 1,
                    },

                    // INFO: Mention
                    [`.${CLASSNAMES.Mention}`]: {
                        color: "primary.main",
                        bgcolor: alpha(primary.light, 0.2),
                        px: 0.5,
                        borderRadius: 1,
                    },

                    height: 1,

                    borderRadius: 1,
                    border: editable ? "1px solid" : undefined,
                    borderColor: editable ? getBorderColor2 : undefined,

                    ...containerSx,
                }}
                {...containerProps}
            >
                {editable && editor ? (
                    <MenuBar
                        onLoad={setMenubarRef}
                        sx={getMenuBarSx(editable)}
                    />
                ) : undefined}

                <EditorContent
                    data-testid={EDITOR_CONTENT_ID}
                    editor={editor}
                    {...props}
                >
                    {editable && editor && menubarRef.current ? (
                        <BubbleMenu menubar={menubarRef.current} />
                    ) : null}
                </EditorContent>

                {children}
            </Stack>
        );
    }
);

/**
 * content: a string containing a JSON in TipTap-acceptable format
 * onUpdate: provides the parent with the editor's content formatted in TipTap-acceptable JSON
 */
const ProviderWrap = forwardRef<EditorRef, EditorProps>(
    ({ mode = "json", onUpdate, onPlainTextUpdate, ...props }, ref) => {
        const handleUpdate = useCallback(
            ({ editor }: EditorEvents["update"]) => {
                try {
                    const value =
                        mode === "json" ? editor.getJSON() : editor.getHTML();
                    const sValue = (
                        mode === "json" ? JSON.stringify(value) : value
                    ) as string;
                    onUpdate?.(sValue);

                    if (!onPlainTextUpdate) return;
                    const plain = editor.getText();
                    onPlainTextUpdate(plain);
                } catch (ex) {
                    debuglog(ex);
                }
            },
            [mode, onUpdate, onPlainTextUpdate]
        );

        return (
            <EditorProvider editable={props.editable} onUpdate={handleUpdate}>
                <Editor ref={ref} {...props} />
            </EditorProvider>
        );
    }
);

export { EDITOR_CONTENT_ID };
export type { TEditor, EditorRef, EditorProps };
export default ProviderWrap;
