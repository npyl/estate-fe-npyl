import CancelButton from "./CancelButton";
import SendButton from "./SendButton";
import { FC } from "react";
import { SpaceBetween } from "@/components/styled";

interface ActionsProps {
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onClose }) => (
    <SpaceBetween
        p={1}
        borderRadius={1}
        alignItems="center"
        bgcolor="background.neutral"
    >
        <CancelButton onClick={onClose} />
        <SendButton />
    </SpaceBetween>
);

export default Actions;
