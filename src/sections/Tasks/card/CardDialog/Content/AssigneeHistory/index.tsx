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
    updatedAt: string;
    last: boolean;
}

const HistoryItem: FC<HistoryItemProps> = ({ i, last, updatedAt }) => {
    const { t, i18n } = useTranslation();
    const loc = i18n.language === "en" ? "en-US" : "el-GR";

    if (!updatedAt) return null;
    const dateObj = new Date(updatedAt);

    const formattedDate = dateObj.toLocaleDateString(loc, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString(loc, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
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
                    {/* Format like this 12/02/2024 - 16:32 */}
                    {formattedDate} - {formattedTime}
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
                updatedAt={i.createdAt}
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
