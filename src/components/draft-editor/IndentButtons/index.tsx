import { decreaseIndent, increaseIndent } from "./utils";
import FormatIndentDecreaseOutlinedIcon from "@mui/icons-material/FormatIndentDecreaseOutlined";
import FormatIndentIncreaseOutlinedIcon from "@mui/icons-material/FormatIndentIncreaseOutlined";
import { Stack, Tooltip } from "@mui/material";
import { EditorState } from "react-draft-wysiwyg";
import { useTranslation } from "react-i18next";

const iconSx = { cursor: "pointer" };

interface IndentButtonsProps {
    editorState: EditorState;
    setEditorState: (state: EditorState) => void;
}

const IndentButtons: React.FC<IndentButtonsProps> = ({
    editorState,
    setEditorState,
}) => {
    const { t } = useTranslation();

    const handleIncrease = () => increaseIndent(editorState, setEditorState);
    const handleDecrease = () => decreaseIndent(editorState, setEditorState);

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            pb={0.4}
            px={0.5}
        >
            {/* Indent button */}
            <Tooltip title={t("Indent")} placement="top">
                <FormatIndentIncreaseOutlinedIcon
                    onClick={handleIncrease}
                    sx={iconSx}
                    type="button"
                    fontSize="small"
                />
            </Tooltip>

            {/* Outdent button */}
            <Tooltip title={t("Outdent")} placement="top">
                <FormatIndentDecreaseOutlinedIcon
                    onClick={handleDecrease}
                    sx={iconSx}
                    type="button"
                    fontSize="small"
                />
            </Tooltip>
        </Stack>
    );
};

export default IndentButtons;
