import Stack from "@mui/material/Stack";
import { useAttachmentsContext } from "../Context";
import { IKanbanAttachment } from "@/types/tasks";
import Attachment from "./Attachment";

// --------------------------------------------------------------

const getAttachment = (a: IKanbanAttachment) => <Attachment key={a.id} a={a} />;

// --------------------------------------------------------------

const Attachments = () => {
    const { attachments } = useAttachmentsContext();

    if (attachments.length === 0) return null;

    return (
        <Stack direction="row" gap={1} flexWrap="wrap">
            {attachments?.map(getAttachment)}
        </Stack>
    );
};

export default Attachments;
