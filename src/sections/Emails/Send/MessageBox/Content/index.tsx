import Stack from "@mui/material/Stack";
import { FC } from "react";
import Recipients from "./Recipients";
import StyledEditor from "./StyledEditor";
import RHFSubject from "./RHFSubject";
import RHFProperties from "./RHFProperties";
import Actions from "./Actions";
import PaperWithFullscreen from "./PaperWithFullscreen";
import Attachments from "./Attachments";

interface ContentProps {
    thread: boolean;
    onClose: VoidFunction;
}

const Content: FC<ContentProps> = ({ thread, onClose }) => (
    <PaperWithFullscreen>
        <Stack position="relative" height={1}>
            <Stack p={1} spacing={1} position="relative">
                {thread ? null : <Recipients />}
                {thread ? null : <RHFSubject />}
                <RHFProperties />
            </Stack>
            <StyledEditor>
                <Attachments />
            </StyledEditor>
        </Stack>
        <Actions onClose={onClose} />
    </PaperWithFullscreen>
);

export default Content;
