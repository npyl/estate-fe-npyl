import BaseHeader from "@/components/BaseCalendar/Header";
import { BaseCalendarHeaderProps } from "@/components/BaseCalendar/types";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const CalendarHeader: FC<BaseCalendarHeaderProps> = ({
    children,
    ...props
}) => (
    <BaseHeader
        {...props}
        style={{
            position: "relative",
        }}
    >
        <Typography
            position="absolute"
            top="50%"
            left="50%"
            sx={{
                transform: "translate(-50%, -50%)",
            }}
        >
            {props.date.toDateString()}
        </Typography>
    </BaseHeader>
);

export default CalendarHeader;
