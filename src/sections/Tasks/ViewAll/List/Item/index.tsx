import { IKanbanCardShort } from "@/types/tasks";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { SpaceBetween } from "@/components/styled";
import TaskLabel from "@/sections/Tasks/card/CardDialog/TaskLabel";
import TooltipAvatar from "@/components/Avatar/Group/TooltipAvatar";
import { Box, SxProps, Theme, Tooltip } from "@mui/material";
import { getTaskColor } from "@/sections/Tasks/styled";
import PriorityLabel from "@/sections/Tasks/card/PriorityLabel";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
const CompletedLabel = dynamic(() => import("./CompletedLabel"));

const UpdatedAtIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_718_11623)">
            <path
                d="M8.00016 4.00016V8.00016L10.6668 9.3335M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                stroke="#98A2B3"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_718_11623">
                <rect width="16" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const CommentIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M13 6.66669C13.0023 7.5466 12.7967 8.41461 12.4 9.20002C11.9296 10.1412 11.2065 10.9328 10.3116 11.4862C9.41677 12.0396 8.3855 12.3329 7.33333 12.3334C6.45342 12.3356 5.58541 12.1301 4.8 11.7334L1 13L2.26667 9.20002C1.86995 8.41461 1.66437 7.5466 1.66667 6.66669C1.66707 5.61452 1.96041 4.58325 2.51381 3.68839C3.06722 2.79352 3.85884 2.0704 4.8 1.60002C5.58541 1.20331 6.45342 0.997725 7.33333 1.00002H7.66667C9.05623 1.07668 10.3687 1.66319 11.3528 2.64726C12.3368 3.63132 12.9233 4.94379 13 6.33335V6.66669Z"
            stroke="#98A2B3"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const NoAssignee = () => null;

const getItemSx = (priority: number): SxProps<Theme> => ({
    position: "relative",
    cursor: "pointer",
    borderLeft: "3px solid",
    borderLeftColor: getTaskColor(priority),
    borderRadius: "2px",
    ":not(last-of-type)": {
        borderBottom: 0,
    },
    "&:hover": {
        backgroundColor: ({ palette: { mode, neutral } }) =>
            mode === "light" ? neutral?.[200] : neutral?.[800],
    },
});

const getSx = (isCompleted: boolean): SxProps<Theme> => ({
    textDecoration: isCompleted ? "line-through" : "none",
});

interface ItemProps {
    c: IKanbanCardShort;
    onClick: VoidFunction;
}

const Item: FC<ItemProps> = ({ c, onClick }) => {
    const { t, i18n } = useTranslation();
    const assignee = c.assignees?.[0];
    const isCompleted = c.completed;
    const formatDate = (timestamp: string) => {
        return new Intl.DateTimeFormat(i18n.language, {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(timestamp));
    };

    return (
        <SpaceBetween
            p={1}
            bgcolor="background.paper"
            border="1px solid"
            borderColor="divider"
            alignItems="center"
            sx={getItemSx(c.priority)}
            onClick={onClick}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <TaskLabel taskCode={c?.uniqueCode} sx={getSx(isCompleted)} />
                <Typography variant="body2">{c.name}</Typography>
            </Stack>

            <PriorityLabel
                position="absolute"
                left="50%"
                priority={c?.priority}
                display={{
                    xs: "none",
                    lg: "block",
                }}
            />
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                left={"63%"}
                position="absolute"
            >
                <UpdatedAtIcon />
                <Tooltip title={t("Last Updated Date")} placement="top">
                    <Typography variant="body2">
                        {formatDate(c?.updatedAt ?? "N/A")}
                    </Typography>
                </Tooltip>
            </Stack>

            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                left={"82%"}
                position="absolute"
            >
                <CommentIcon />

                <Typography variant="body2">
                    {c.commentsCount} {t("Comments")}
                </Typography>
            </Stack>
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="flex-end"
                width="25%"
            >
                {isCompleted ? <CompletedLabel /> : null}
                {assignee ? <TooltipAvatar u={assignee} /> : <NoAssignee />}
            </Stack>
        </SpaceBetween>
    );
};

export default Item;
