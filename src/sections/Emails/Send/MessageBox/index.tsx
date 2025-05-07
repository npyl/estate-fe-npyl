import Editor from "@/components/Editor";
import {
    ClickAwayListener,
    Divider,
    Paper,
    SxProps,
    Theme,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { FC } from "react";

const MessageBoxSx: SxProps<Theme> = {
    position: "absolute",
    bottom: 30,
    right: 30,

    width: "700px",

    backgroundColor: "background.paper",

    boxShadow: 20,

    zIndex: 2,
};

interface Props {
    onClose: VoidFunction;
}

const MessageBox: FC<Props> = ({ onClose }) => {
    return (
        <ClickAwayListener onClickAway={onClose}>
            <Paper sx={MessageBoxSx} variant="outlined">
                <Stack p={1}>To:</Stack>
                <Divider />
                <Editor containerSx={{ border: 0 }} />
            </Paper>
        </ClickAwayListener>
    );
};

export default MessageBox;
