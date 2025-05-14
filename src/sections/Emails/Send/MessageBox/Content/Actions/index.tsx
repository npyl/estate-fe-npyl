import CancelButton from "./CancelButton";
import SendButton from "./SendButton";
import Stack from "@mui/material/Stack";
import Reporter from "@/sections/Reporter";
import Attachments from "./AttachmentsButton";
import { FC } from "react";

interface ActionsProps {
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onClose }) => (
    <Stack
        direction="row"
        alignItems="center"
        p={1}
        bgcolor="background.neutral"
        borderRadius={1}
    >
        <Stack direction="row" spacing={1} alignItems="center">
            <Reporter />
            <Attachments />
        </Stack>

        <Stack width={1} />
        <Stack direction="row" spacing={1} alignItems="center">
            <CancelButton onClick={onClose} />
            <SendButton />
        </Stack>
    </Stack>
);

export default Actions;
