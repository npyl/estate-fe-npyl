import {
    Editor as TEditor,
    EditorContent,
    EditorContentProps,
    EditorEvents,
} from "@tiptap/react";
import Box, { BoxProps } from "@mui/material/Box";
import {
    CSSProperties,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
} from "react";
import { SxProps, Theme } from "@mui/material";
import dynamic from "next/dynamic";
import { EditorProvider, useEditorContext } from "./context";
import { debuglog } from "util";
const MenuBar = dynamic(() => import("./MenuBar"));
const BubbleMenu = dynamic(() => import("./BubbleMenu"));

type EditorRef = TEditor | null;

type EditorProps = Omit<
    EditorContentProps,
    "editor" | "contentEditable" | "ref" | "onChange"
> & {
    editable?: boolean;

    containerProps?: Omit<BoxProps, "sx">;
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

        return (
            <Box
                sx={{
                    "& .tiptap": {
                        minHeight: "100px",
                        borderBottomRightRadius: "16px",
                        borderBottomLeftRadius: "16px",
                        padding: "5px",
                        paddingLeft: "10px",

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

                    ...containerSx,
                }}
                {...containerProps}
            >
                {editable && editor ? <MenuBar /> : undefined}

                <EditorContent
                    className="PPEditorContent"
                    editor={editor}
                    {...props}
                >
                    {editable && editor ? <BubbleMenu /> : null}
                    {children}
                </EditorContent>
            </Box>
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
