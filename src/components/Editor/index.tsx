import {
    Editor as TEditor,
    EditorContent,
    EditorContentProps,
    EditorEvents,
} from "@tiptap/react";
import {
    CSSProperties,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
} from "react";
import { SxProps, Theme } from "@mui/material";
import Stack, { StackProps } from "@mui/material/Stack";
import dynamic from "next/dynamic";
import { EditorProvider, useEditorContext } from "./context";
import { debuglog } from "util";
import { getBorderColor2 } from "@/theme/borderColor";
const MenuBar = dynamic(() => import("./MenuBar"));
const BubbleMenu = dynamic(() => import("./BubbleMenu"));

type EditorRef = TEditor | null;

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

        useImperativeHandle(ref, () => editor!, [editor]);

        const menubarRef = useRef<HTMLDivElement>();
        const setMenubarRef = useCallback(
            (e: HTMLDivElement) => (menubarRef.current = e),
            []
        );

        return (
            <Stack
                sx={{
                    "& .tiptap": {
                        minHeight: "200px",

                        borderTop: "1px solid",
                        borderTopColor: editable ? getBorderColor2 : undefined,

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

                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: editable ? getBorderColor2 : undefined,

                    ...containerSx,
                }}
                {...containerProps}
            >
                {editable && editor ? (
                    <MenuBar onLoad={setMenubarRef} />
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
    ({ content: _content, onUpdate, onPlainTextUpdate, ...props }, ref) => {
        const content = useMemo(
            () => (_content ? JSON.parseSafe(_content) : ""),
            [_content]
        );

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
            <EditorProvider
                editable={props.editable}
                content={content}
                onUpdate={handleUpdate}
            >
                <Editor ref={ref} {...props} />
            </EditorProvider>
        );
    }
);

export type { EditorRef, EditorProps };
export default ProviderWrap;
