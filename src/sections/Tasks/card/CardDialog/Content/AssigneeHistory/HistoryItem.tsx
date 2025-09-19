import { FC } from "react";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { TimelineItemProps } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { SxProps, Theme, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TooltipAvatar from "@/components/Avatar/Group/TooltipAvatar";
import { IUserMini } from "@/types/user";

const DotSx: SxProps<Theme> = {
    backgroundColor: "primary.main",
    my: 0,
};
const ConnectorSx: SxProps<Theme> = {
    backgroundColor: "primary.main",
};
const TimelineContentSx: SxProps<Theme> = {
    mt: -3.5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
};

interface HistoryItemProps extends TimelineItemProps {
    date: string;
    label: string;
    last?: boolean;
    person?: IUserMini;
}

const HistoryItem: FC<HistoryItemProps> = ({
    person,
    last = false,
    date,
    label,
    sx,
    ...props
}) => {
    const { t, i18n } = useTranslation();

    if (!person) return null;

    if (!date) return null;

    const dateObj = new Date(date);

    const loc = i18n.language === "en" ? "en-US" : "el-GR";
    const formattedDate = dateObj.toLocaleDateString(loc, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const formattedTime = dateObj.toLocaleTimeString(loc, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <TimelineItem sx={{ minHeight: "40px", ...sx }} {...props}>
            <TimelineSeparator>
                <TimelineDot sx={DotSx} />
                {!last ? <TimelineConnector sx={ConnectorSx} /> : null}
            </TimelineSeparator>
            <TimelineContent sx={TimelineContentSx}>
                <Typography
                    variant="body2"
                    fontWeight="600"
                    color="primary.main"
                    noWrap
                >
                    {formattedDate} - {formattedTime}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {t(label)}
                </Typography>
                <TooltipAvatar u={person} />
            </TimelineContent>
        </TimelineItem>
    );
};

export default HistoryItem;
