import { SpaceBetween } from "@/components/styled";
import CancelButton from "./CancelButton";
import SendButton from "./SendButton";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import FromPicker from "./FromPicker";

interface ActionsProps {
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onClose }) => (
    <SpaceBetween
        alignItems="center"
        p={1}
        bgcolor="background.neutral"
        borderRadius={1}
    >
        <FromPicker />
        <Stack direction="row" spacing={1} alignItems="center">
            <CancelButton onClick={onClose} />
            <SendButton />
        </Stack>
    </SpaceBetween>
);

export default Actions;
