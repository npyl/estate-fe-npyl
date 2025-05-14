import { MENUBAR_CLASSNAME } from "@/components/Editor/MenuBar";
import RHFEditor, { RHFEditorProps } from "@/components/hook-form/RHFEditor";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";

const EDITOR_ZINDEX = 1;

const EditorContainerSx: SxProps<Theme> = {
    border: 0,
    zIndex: EDITOR_ZINDEX,
    pb: 5,

    ".tiptap": {
        pl: 2,
        overflowY: "auto",
    },

    [`.${MENUBAR_CLASSNAME}`]: {
        position: "absolute",
        bottom: 0,
        width: 1,
        bgcolor: "background.paper",
        zIndex: EDITOR_ZINDEX,
    },
};

type StyledEditorProps = Omit<RHFEditorProps, "name" | "mode" | "containerSx">;

const StyledEditor: FC<StyledEditorProps> = (props) => (
    <RHFEditor
        name="body"
        mode="html"
        containerSx={EditorContainerSx}
        {...props}
    />
);

export { EDITOR_ZINDEX };
export default StyledEditor;
