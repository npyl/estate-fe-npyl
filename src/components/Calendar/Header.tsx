import BaseHeader from "@/components/BaseCalendar/Header";
import {
    BaseCalendarHeaderProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import Typography from "@mui/material/Typography";
import { CSSProperties, FC } from "react";

const Style: CSSProperties = {
    position: "relative",
};

const renderValue = (view: TCalendarView, date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { timeZone: "UTC" };

    switch (view) {
        case "day":
            options.weekday = "long";
            options.year = "numeric";
            options.month = "long";
            options.day = "numeric";
            break;
        case "week":
            const startOfWeek = new Date(date);
            startOfWeek.setDate(date.getDate() - date.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            })} - ${endOfWeek.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}`;
        case "month":
            options.year = "numeric";
            options.month = "long";
            break;
        case "year":
            options.year = "numeric";
            break;
    }

    return date.toLocaleDateString("en-US", options);
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
            {renderValue(props.view, props.date)}
        </Typography>
    </BaseHeader>
);

export default CalendarHeader;
