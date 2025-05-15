import IsAuthenticatedIndicator from "@/sections/Google/WorkspaceIndicator/IsAuthenticatedIndicator";
import { useGetThreadQuery } from "@/services/email";
import { useAuth } from "@/hooks/use-auth";
import Stack from "@mui/material/Stack";
import ReplyButton from "./ReplyButton";
import getMessage from "./getMessage";
import { FC, useRef } from "react";
import Box from "@mui/material/Box";
import { SpaceBetween } from "@/components/styled";
import CollapseToggle from "./CollapseToggle";
import {
    COLLAPSE_ICON_CLASSNAME,
    COLLAPSED_CLASSNAME,
    GROW_ICON_CLASSNAME,
    VIEW_CLASSNAME,
} from "./constant";
import { SxProps, Theme } from "@mui/material";

interface MessagesProps {
    threadId: string;
}

const Messages: FC<MessagesProps> = ({ threadId }) => {
    const { user } = useAuth();
    const { data } = useGetThreadQuery({ userId: user?.id!, threadId });
    const { messages } = data || {};

    const count = messages?.length ?? 0;

    return <Stack spacing={1}>{messages?.map(getMessage(count))}</Stack>;
};

interface TitleProps {
    threadId: string;
}

const Title: FC<TitleProps> = ({ threadId }) => {
    const { user } = useAuth();
    const { data } = useGetThreadQuery({ userId: user?.id!, threadId });
    return <>{data?.id}</>;
};
const ViewSx: SxProps<Theme> = {
    // Initially hide both icons
    [`.${GROW_ICON_CLASSNAME}`]: {
        display: "none",
    },
    [`.${COLLAPSE_ICON_CLASSNAME}`]: {
        display: "none",
    },

    // When NOT collapsed, show the collapse icon
    [`&:not(:has(.${COLLAPSED_CLASSNAME}))`]: {
        [`.${COLLAPSE_ICON_CLASSNAME}`]: {
            display: "block",
        },
    },

    // When collapsed, show the grow icon
    [`&:has(.${COLLAPSED_CLASSNAME})`]: {
        [`.${GROW_ICON_CLASSNAME}`]: {
            display: "block",
        },
    },
};

interface Props {
    id: string;
}

const ViewById: FC<Props> = ({ id }) => {
    const viewRef = useRef<HTMLDivElement>(null);

    return (
        <Stack sx={ViewSx} className={VIEW_CLASSNAME} ref={viewRef} spacing={1}>
            <SpaceBetween alignItems="center">
                <Title threadId={id} />
                <Stack direction="row" spacing={1}>
                    <CollapseToggle viewRef={viewRef} />
                    <IsAuthenticatedIndicator />
                </Stack>
            </SpaceBetween>

            <Messages threadId={id} />

            <Box>
                <ReplyButton />
            </Box>
        </Stack>
    );
};

export default ViewById;
