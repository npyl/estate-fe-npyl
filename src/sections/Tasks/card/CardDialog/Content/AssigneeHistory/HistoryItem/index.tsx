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
import FormattedDate from "./FormattedDate";

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
    const { t } = useTranslation();

    if (!person) return null;
    if (!date) return null;

    return (
        <TimelineItem sx={{ minHeight: "40px", ...sx }} {...props}>
            <TimelineSeparator>
                <TimelineDot sx={DotSx} />
                {!last ? <TimelineConnector sx={ConnectorSx} /> : null}
            </TimelineSeparator>
            <TimelineContent sx={TimelineContentSx}>
                <FormattedDate date={date} />
                <Typography variant="body2" color="text.secondary" noWrap>
                    {t(label)}
                </Typography>
                <TooltipAvatar u={person} />
            </TimelineContent>
        </TimelineItem>
    );
};

export default HistoryItem;
