import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import type { FC } from "react";
import type { EditorProps } from "react-draft-wysiwyg";
import type { Theme } from "@mui/material";
import type { SxProps } from "@mui/material";
import dynamic from "next/dynamic";
import DraftEditorRoot from "./styled";
import toolbarOptions from "./options";

const Editor = dynamic(
    async () => {
        const m = await import("react-draft-wysiwyg");
        return m.Editor;
    },
    { ssr: false }
);

interface DraftEditorProps extends Omit<EditorProps, "toolbar"> {
    sx?: SxProps<Theme>;
}

const DraftEditor: FC<DraftEditorProps> = ({ sx, ...other }) => (
    <DraftEditorRoot sx={sx}>
        <Editor {...other} toolbar={toolbarOptions} />
    </DraftEditorRoot>
);

export default DraftEditor;
