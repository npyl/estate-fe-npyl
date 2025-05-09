import Editor from "@/components/Editor";
import { MENUBAR_CLASSNAME } from "@/components/Editor/MenuBar";
import { SpaceBetween } from "@/components/styled";
import { Paper, Stack, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";
import SendButton from "./SendButton";
import InputField from "./InputField";
import Recipients from "./Recipients";

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

    px: 0.5,

    [`.${MENUBAR_CLASSNAME}`]: {
        position: "absolute",
        bottom: 0,
    },
};

interface ContentProps {
    onClose: VoidFunction;
}

const Content: FC<ContentProps> = ({ onClose }) => {
    const { t } = useTranslation();

    return (
        <Paper sx={MessageBoxSx} variant="outlined">
            <SpaceBetween>
                <CloseButton onClick={onClose} />
                <SendButton />
            </SpaceBetween>

            <Stack p={1} spacing={1}>
                <Recipients />
                <InputField placeholder={t<string>("Subject")} />
            </Stack>

            <Editor containerSx={EditorContainerSx} />
        </Paper>
    );
};

export default Content;
