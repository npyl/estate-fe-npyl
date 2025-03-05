import {
    Editor as TEditor,
    EditorContent,
    EditorContentProps,
} from "@tiptap/react";
import Box, { BoxProps } from "@mui/material/Box";
import { CSSProperties, forwardRef, useImperativeHandle } from "react";
import { SxProps, Theme } from "@mui/material";
import dynamic from "next/dynamic";
import { EditorProvider, useEditorContext } from "./context";
const MenuBar = dynamic(() => import("./MenuBar"));

type EditorRef = TEditor | null;

type EditorProps = Omit<
    EditorContentProps,
    "editor" | "contentEditable" | "ref"
> & {
    editable?: boolean;

    containerProps?: Omit<BoxProps, "sx">;
    containerSx?: SxProps<Theme>;
    tiptapStyle?: CSSProperties;
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
                <EditorContent editor={editor} {...props} />
            </Box>
        );
    }
);

const ProviderWrap = forwardRef<EditorRef, EditorProps>(
    ({ content, ...props }, ref) => (
        <EditorProvider editable={props.editable} content={content}>
            <Editor ref={ref} {...props} />
        </EditorProvider>
    )
);

export type { EditorRef, EditorProps };
export default ProviderWrap;
