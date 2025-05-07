import Editor from "@/components/Editor";
import { MENUBAR_CLASSNAME } from "@/components/Editor/MenuBar";
import { SpaceBetween } from "@/components/styled";
import { Paper, SxProps, TextField, Theme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";
import SendButton from "./SendButton";

const MessageBoxSx: SxProps<Theme> = {
    position: "absolute",
    bottom: 30,
    right: 30,

    width: "700px",

    backgroundColor: "background.paper",

    boxShadow: 20,

    zIndex: 2,
};

const EditorContainerSx: SxProps<Theme> = {
    border: 0,
    flexDirection: "column-reverse",
    maxHeight: "60vh",
    overflowY: "auto",
    zIndex: 1,
    mb: 5,

    [`.${MENUBAR_CLASSNAME}`]: {
        position: "absolute",
        bottom: 0,
    },
};

interface Props {
    onClose: VoidFunction;
}

const MessageBox: FC<Props> = ({ onClose }) => {
    const { t } = useTranslation();

    return (
        <Paper sx={MessageBoxSx} variant="outlined">
            <SpaceBetween>
                <CloseButton onClick={onClose} />
                <SendButton />
            </SpaceBetween>

            <TextField label={t("To:")} fullWidth variant="standard" />
            <TextField fullWidth variant="standard" />

            <Editor containerSx={EditorContainerSx} />
        </Paper>
    );
};

export default MessageBox;
