import { useGetAssigneeHistoryQuery } from "@/services/tasks";
import Skeleton from "@mui/material/Skeleton";
import { FC } from "react";
import { SxProps, Theme, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import { useTranslation } from "react-i18next";
import { IUserMini } from "@/types/user";
import HistoryItem from "./HistoryItem";

const TimelineSx: SxProps<Theme> = {
    "& .MuiTimelineItem-root": {
        "&:before": {
            flex: 0,
            padding: 0,
        },
    },
};

interface AssigneeHistoryProps {
    cardId: number;
    reporter?: IUserMini;
    updatedBy?: IUserMini;
    updatedAt?: string;
}

const AssigneeHistory: FC<AssigneeHistoryProps> = ({
    cardId,
    reporter,
    // ...
    updatedBy,
    updatedAt,
}) => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetAssigneeHistoryQuery(cardId);

    if (isLoading) return <Skeleton width="150px" height="58px" />;

    if (!data || data.length === 0) return null;

    const first = data[0];

    return (
        <>
            <Typography fontWeight={"bold"}>{t("Activity")}</Typography>

            <Timeline sx={TimelineSx}>
                {/* Created by */}
                {reporter ? (
                    <HistoryItem
                        label={t("Created by")}
                        date={first.createdAt}
                        person={reporter}
                    />
                ) : null}

                {/* Changes */}
                {data.map((i, index) => (
                    <HistoryItem
                        key={i.createdAt}
                        person={i.assignees?.at(0)}
                        date={i.createdAt}
                        label={t("Assigned to")}
                        last={index === data.length - 1 && !updatedBy}
                    />
                ))}

                {/* Updated by */}
                {updatedAt && updatedBy ? (
                    <HistoryItem
                        label={t("Updated by")}
                        date={updatedAt}
                        person={updatedBy}
                        last
                    />
                ) : null}
            </Timeline>
        </>
    );
};

export default AssigneeHistory;
