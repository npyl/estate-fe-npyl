import dynamic from "next/dynamic";
import { type FC } from "react";
import type { EditorProps } from "react-draft-wysiwyg";
import { type Theme } from "@mui/material";
import type { SxProps } from "@mui/material";
import DraftEditorRoot from "./styled";
import toolbarOptions from "./options";
import { EditorState } from "draft-js";
import IndentButtons from "./IndentButtons";
import { indentStyleFn } from "./IndentButtons/utils";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
    async () => {
        const m = await import("react-draft-wysiwyg");
        return m.Editor;
    },
    { ssr: false }
);

interface PPEditorProps extends Omit<EditorProps, "toolbar"> {
    sx?: SxProps<Theme>;
}

const PPEditor: FC<PPEditorProps> = ({ sx, readOnly = false, ...other }) => {
    const toolbarCustomButtons = [
        <IndentButtons
            editorState={other.editorState || EditorState.createEmpty()}
            setEditorState={other.onEditorStateChange || (() => {})}
        />,
    ];

    return (
        <DraftEditorRoot sx={sx}>
            <Editor
                {...other}
                toolbar={toolbarOptions}
                readOnly={readOnly}
                toolbarHidden={readOnly}
                toolbarCustomButtons={toolbarCustomButtons}
                // INFO: the following prop does not exist in WYSIWYG editor's props but is passed (checked!) to the internal Draft-js editor
                //       We have not found a better way to do this but extend the type using a type.d.ts
                blockStyleFn={indentStyleFn}
            />
        </DraftEditorRoot>
    );
};

export default PPEditor;
