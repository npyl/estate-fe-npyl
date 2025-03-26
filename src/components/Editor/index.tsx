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
    useRef,
} from "react";
import { SxProps, Theme } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { EditorProvider, useEditorContext } from "./context";
import { debuglog } from "util";
import getBorderColor, { getBorderColor2 } from "@/theme/borderColor";
const MenuBar = dynamic(() => import("./MenuBar"));
const BubbleMenu = dynamic(() => import("./BubbleMenu"));

// ----------------------------------------------------------------------

const getMenuBarSx = (editable: boolean): SxProps<Theme> => ({
    borderBottom: editable ? "1px solid" : undefined,
    borderBottomColor: editable ? getBorderColor2 : undefined,
    boxShadow: ({ shadows }) => shadows[3],
});

// ----------------------------------------------------------------------

const useContentUpdate = (
    editor: TEditor | null,
    content: string | undefined
) => {
    useEffect(() => {
        if (!content) {
            editor?.commands?.clearContent();
            return;
        }

        const parsed = JSON.parseSafe(content);
        if (!parsed) return;

        editor?.commands?.setContent(parsed);
    }, [editor, content]);
};

const useForwardEditorRef = (
    editor: TEditor | null,
    ref: ForwardedRef<TEditor>
) => {
    useEffect(() => {
        // INFO: precaution; the provider is responsible for loading this component *ONLY* when the object is ready
        if (!editor) return;

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
                        minHeight: "200px",

                        px: 1.5,

                        ...(!editable
                            ? {
                                  userSelect: "none",
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
                    ".PPEditor-BlockQuote": {
                        borderLeft: "3px solid",
                        borderColor: getBorderColor,
                        color: "text.secondary",
                        marginX: 0.5,
                        paddingLeft: 1,
                    },

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

                <EditorContent editor={editor} {...props}>
                    {editable && editor && menubarRef.current ? (
                        <BubbleMenu menubar={menubarRef.current} />
                    ) : null}

                    {children}
                </EditorContent>
            </Stack>
        );
    }
);

/**
 * content: a string containing a JSON in TipTap-acceptable format
 * onUpdate: provides the parent with the editor's content formatted in TipTap-acceptable JSON
 */
const ProviderWrap = forwardRef<EditorRef, EditorProps>(
    ({ onUpdate, onPlainTextUpdate, ...props }, ref) => {
        const handleUpdate = useCallback(
            ({ editor }: EditorEvents["update"]) => {
                try {
                    const value = editor.getJSON();
                    const sValue = JSON.stringify(value);
                    onUpdate?.(sValue);

                    if (!onPlainTextUpdate) return;
                    const plain = editor.getText();
                    onPlainTextUpdate(plain);
                } catch (ex) {
                    debuglog(ex);
                }
            },
            [onUpdate, onPlainTextUpdate]
        );

        return (
            <EditorProvider editable={props.editable} onUpdate={handleUpdate}>
                <Editor ref={ref} {...props} />
            </EditorProvider>
        );
    }
);

export type { EditorRef, EditorProps };
export default ProviderWrap;
