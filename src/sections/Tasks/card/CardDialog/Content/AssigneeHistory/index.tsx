import { useGetAssigneeHistoryQuery } from "@/services/tasks";
import { IKanbanAssigneeHistory } from "@/types/tasks";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Stack, SxProps, Theme, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import AvatarGroup from "@/components/Avatar/Group";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------------

const DotSx: SxProps<Theme> = {
    backgroundColor: "primary.main",
    my: 0,
};
const ConnectorSx: SxProps<Theme> = { backgroundColor: "primary.main" };
const TimelineContentSx: SxProps<Theme> = {
    mt: -1.5,
};
const TimelineSx: SxProps<Theme> = {
    "& .MuiTimelineItem-root": {
        "&:before": {
            flex: 0,
            padding: 0,
        },
    },
};

interface HistoryItemProps {
    i: IKanbanAssigneeHistory;
    last: boolean;
}

const HistoryItem: FC<HistoryItemProps> = ({ i, last }) => {
    const { t } = useTranslation();

    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot sx={DotSx} />
                {!last ? <TimelineConnector sx={ConnectorSx} /> : null}
            </TimelineSeparator>
            <TimelineContent sx={TimelineContentSx}>
                <Typography
                    variant="body2"
                    fontWeight="600"
                    color="primary.main"
                >
                    {dayjs(i.createdAt).toDate().toLocaleDateString()}
                </Typography>
                <Stack
                    direction="row"
                    gap={0.6}
                    alignItems="center"
                    flexWrap="wrap"
                    mb={1}
                >
                    <Typography variant="body1">{t("Assigned to")}</Typography>
                    <AvatarGroup users={i?.assignees} />
                </Stack>
            </TimelineContent>
        </TimelineItem>
    );
};

// ----------------------------------------------------------------------------

const getHistoryItem =
    (length: number) => (i: IKanbanAssigneeHistory, index: number) => {
        const ids = i?.assignees?.map(({ id }) => id);
        return (
            <HistoryItem
                key={JSON.stringify(ids)}
                i={i}
                last={index === length - 1}
            />
        );
    };

// -----------------------------------------------------------------

interface AssigneeHistoryProps {
    cardId: number;
}

const AssigneeHistory: FC<AssigneeHistoryProps> = ({ cardId }) => {
    const { data, isLoading } = useGetAssigneeHistoryQuery(cardId);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    return (
        <Timeline sx={TimelineSx}>
            {data?.map(getHistoryItem(data?.length))}
        </Timeline>
    );
};

export default AssigneeHistory;
