import { Box, Paper, Stack, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import Recipients from "./Recipients";
import getBorderColor from "@/theme/borderColor";
import StyledEditor, { EDITOR_ZINDEX } from "./StyledEditor";
import RHFSubject from "./RHFSubject";
import RHFProperties from "./RHFProperties";
import Actions from "./Actions";

const MessageBoxSx: SxProps<Theme> = {
    position: "fixed",
    bottom: 30,
    right: 30,
    zIndex: EDITOR_ZINDEX + 1,
    width: "700px",
    backgroundColor: "background.paper",
    boxShadow: 20,

    border: "1px solid",
    borderColor: getBorderColor,
};

interface ContentProps {
    onClose: VoidFunction;
}

const Content: FC<ContentProps> = ({ onClose }) => (
    <Paper sx={MessageBoxSx} variant="outlined">
        <Box position="relative">
            <Stack p={1} spacing={1} position="relative">
                <Recipients />
                <RHFSubject />
                <RHFProperties />
            </Stack>
            <StyledEditor />
        </Box>
        <Actions onClose={onClose} />
    </Paper>
);

export default Content;
