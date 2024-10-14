import { Paper, styled, useTheme } from "@mui/material";
import { FC } from "react";
import React from "react";
import { BaseCalendarDayViewProps } from "@/components/BaseCalendar/types";
import Calendar from "@/components/Calendar";
import CalendarDayView from "@/components/Calendar/Views/Day";
import Numbering from "@/components/Calendar/Views/Numbering";

const NullButtonGroup = ({}: any) => null;

const PaperSx = {
    borderRadius: "15px",
};

// ------------------------------------------------------------------------

const ThemedNumbering = styled(Numbering)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const ThemedDayView: FC<BaseCalendarDayViewProps> = ({ style, ...props }) => {
    const theme = useTheme();

    return (
        <CalendarDayView
            {...props}
            Numbering={ThemedNumbering}
            style={{
                backgroundColor:
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.neutral?.[800],

                height: "300px",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",

                ...style,
            }}
        />
    );
};

// ------------------------------------------------------------------------

const SimpleCalendar = () => (
    <Paper sx={PaperSx}>
        <Calendar
            initialView="day"
            ViewSlots={{
                DayView: ThemedDayView,
            }}
            HeaderSlots={{
                ViewButtonGroup: NullButtonGroup,
            }}
        />
    </Paper>
);

export default React.memo(SimpleCalendar);
