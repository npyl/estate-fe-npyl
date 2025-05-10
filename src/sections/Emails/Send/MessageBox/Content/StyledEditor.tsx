import { MENUBAR_CLASSNAME } from "@/components/Editor/MenuBar";
import RHFEditor from "@/components/hook-form/RHFEditor";
import { SxProps, Theme, useTheme } from "@mui/material";
const EDITOR_ZINDEX = 1;

const EditorContainerSx: SxProps<Theme> = {
    border: 0,
    flexDirection: "column-reverse",
    maxHeight: "60vh",
    overflowY: "auto",
    zIndex: EDITOR_ZINDEX,
    pb: 5,

    [`.${MENUBAR_CLASSNAME}`]: {
        position: "absolute",
        bottom: 0,
        width: 1,
        bgcolor: "background.paper",
        zIndex: EDITOR_ZINDEX,
    },
};

const StyledEditor = () => {
    const { spacing } = useTheme();
    return (
        <RHFEditor
            name="body"
            mode="html"
            containerSx={EditorContainerSx}
            tiptapStyle={{
                paddingLeft: spacing(2),
            }}
        />
    );
};

export { EDITOR_ZINDEX };
export default StyledEditor;
