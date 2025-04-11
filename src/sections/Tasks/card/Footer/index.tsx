import { SpaceBetween } from "@/components/styled";
import Comments from "./Comments";
import CreatedAt from "./CreatedAt";
import { FC } from "react";
import { Stack, StackProps } from "@mui/material";
import Attachments from "./Attachments";
import Labels from "./Labels";
import PriorityLabel from "../PriorityLabel";
import CalendarEvent from "./CalendarEvent";

interface FooterProps extends StackProps {
    commentsCount: number;
    createdAt: string;
    attachmentsCount: number;
    labelsCount: number;
    priority: number;
    event: string;
}

const Footer: FC<FooterProps> = ({
    commentsCount,
    createdAt,
    attachmentsCount,
    labelsCount,
    priority,
    event,
    ...props
}) => (
    <SpaceBetween
        alignItems="center"
        borderTop="1px solid"
        borderColor="divider"
        pt={1}
        sx={{ height: "30px" }}
        {...props}
    >
        <Stack direction="row" gap={1}>
            <Comments count={commentsCount} />
            <Attachments count={attachmentsCount} />
            <Labels count={labelsCount} />
            <CalendarEvent event={event} />
        </Stack>
        <Stack direction="row" gap={1}>
            <PriorityLabel priority={priority} />
            <CreatedAt createdAt={createdAt} />
        </Stack>
    </SpaceBetween>
);

export default Footer;
