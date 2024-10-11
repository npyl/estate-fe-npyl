import BaseHeader from "@/components/BaseCalendar/Header";
import { BaseCalendarHeaderProps } from "@/components/BaseCalendar/types";
import Typography from "@mui/material/Typography";
import { CSSProperties, FC } from "react";

const Style: CSSProperties = {
    position: "relative",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.2)",
};

const CalendarHeader: FC<BaseCalendarHeaderProps> = ({
    children,
    ...props
}) => (
    <BaseHeader {...props} style={Style}>
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
