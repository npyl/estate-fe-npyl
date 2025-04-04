import Stack from "@mui/material/Stack";
import { FC } from "react";
import { Skeleton } from "@mui/material";
import { useGetAttachmentsQuery } from "@/services/tasks";
import { IKanbanAttachment } from "@/types/tasks";
import Attachment from "./Attachment";

// --------------------------------------------------------------

const getAttachment = (a: IKanbanAttachment) => <Attachment key={a.id} a={a} />;

// --------------------------------------------------------------

interface ViewProps {
    cardId: number;
}

const View: FC<ViewProps> = ({ cardId }) => {
    const { data: attachments, isLoading } = useGetAttachmentsQuery(cardId);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    return (
        <Stack direction="row" gap={1} flexWrap="wrap">
            {attachments?.map(getAttachment)}
        </Stack>
    );
};

export default View;
