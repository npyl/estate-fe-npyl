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
import { useTranslation } from "react-i18next";
import Avatar from "@/components/Avatar";

const DotSx: SxProps<Theme> = {
    backgroundColor: "primary.main",
    my: 0,
};
const ConnectorSx: SxProps<Theme> = {
    backgroundColor: "primary.main",
};
const TimelineContentSx: SxProps<Theme> = {
    mt: -1.5,
    // py: -15.5,
};
const TimelineSx: SxProps<Theme> = {
    "& .MuiTimelineItem-root": {
        "&:before": {
            flex: 0,
            padding: 0,
        },
    },
};

interface Reporter {
    firstName: string;
    lastName: string;
    avatar?: string;
}

interface HistoryItemProps {
    i: IKanbanAssigneeHistory;
    updatedAt: string;
    last: boolean;
}

const HistoryItem: FC<HistoryItemProps> = ({ i, last, updatedAt }) => {
    console.log(i);
    const { t, i18n } = useTranslation();
    const loc = i18n.language === "en" ? "en-US" : "el-GR";

    const assignee = i.assignees[0]; // use the assignee
    const fullName = `${assignee.firstName} ${assignee.lastName}`;

    if (!updatedAt) return null;
    const dateObj = new Date(updatedAt);

    const formattedDate = dateObj.toLocaleDateString(loc, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString(loc, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <TimelineItem sx={{ minHeight: "40px" }}>
            <TimelineSeparator>
                <TimelineDot sx={DotSx} />
                {!last && <TimelineConnector sx={ConnectorSx} />}
            </TimelineSeparator>
            <TimelineContent sx={TimelineContentSx}>
                <Stack direction="row" alignItems="flex-start" gap={0.5}>
                    <Typography
                        variant="body2"
                        fontWeight="600"
                        color="primary.main"
                        sx={{ textWrap: "nowrap" }}
                    >
                        {formattedDate} - {formattedTime}
                    </Typography>
                    <Stack direction="row" gap={0.6} flexWrap="nowrap" mb={1}>
                        <Typography
                            variant="body2"
                            color={"text.secondary"}
                            sx={{ textWrap: "nowrap" }}
                        >
                            {t("Assigned to")}
                        </Typography>
                        <Avatar
                            src={assignee.avatar}
                            alt={fullName || ""}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textWrap: "nowrap" }}
                        >
                            {fullName}
                        </Typography>{" "}
                    </Stack>
                </Stack>
            </TimelineContent>
        </TimelineItem>
    );
};

const CreatedHistoryItem: FC<{
    createdAt: string;
    reporter?: Reporter;
}> = ({ createdAt, reporter }) => {
    const { t, i18n } = useTranslation();
    const loc = i18n.language === "en" ? "en-US" : "el-GR";
    const fullName = `${reporter?.firstName} ${reporter?.lastName}`;
    const dateObj = new Date(createdAt);
    const formattedDate = dateObj.toLocaleDateString(loc, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString(loc, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <TimelineItem sx={{ minHeight: "40px", width: 1, flex: 1 }}>
            <TimelineSeparator>
                <TimelineDot sx={DotSx} />
                <TimelineConnector sx={ConnectorSx} />
            </TimelineSeparator>
            <TimelineContent sx={TimelineContentSx}>
                <Stack
                    direction="row"
                    alignItems="flex-start"
                    gap={0.5}
                    flexWrap={"nowrap"}
                >
                    <Typography
                        variant="body2"
                        fontWeight="600"
                        color="primary.main"
                        sx={{
                            textWrap: "nowrap",
                        }}
                    >
                        {formattedDate} - {formattedTime}
                    </Typography>
                    <Stack
                        direction="row"
                        gap={0.6}
                        alignItems="flex-start"
                        flexWrap="nowrap"
                    >
                        <Typography variant="body2" color={"text.secondary"}>
                            {t("Created by")}
                        </Typography>
                        <Avatar
                            src={reporter?.avatar}
                            alt={fullName || ""}
                            sx={{ width: 24, height: 24 }}
                        />
                        <Typography
                            color={"text.secondary"}
                            variant="body2"
                            sx={{ textWrap: "nowrap" }}
                        >
                            {fullName}
                        </Typography>
                    </Stack>
                </Stack>
            </TimelineContent>
        </TimelineItem>
    );
};

interface AssigneeHistoryProps {
    cardId: number;
    reporter?: Reporter;
}

const AssigneeHistory: FC<AssigneeHistoryProps> = ({ cardId, reporter }) => {
    const { data, isLoading } = useGetAssigneeHistoryQuery(cardId);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    if (!data || data.length === 0) return null;

    const first = data[0];

    return (
        <Timeline sx={TimelineSx}>
            {/* Created by */}
            <CreatedHistoryItem
                createdAt={first.createdAt}
                reporter={reporter}
            />

            {/* Assignee changes */}
            {data.map((i, index) => (
                <HistoryItem
                    key={index}
                    i={i}
                    updatedAt={i.createdAt}
                    last={index === data.length - 1}
                />
            ))}
        </Timeline>
    );
};

export default AssigneeHistory;
