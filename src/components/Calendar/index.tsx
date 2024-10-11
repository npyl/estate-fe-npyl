import { Button, IconButton, IconButtonProps, Paper } from "@mui/material";
import BaseCalendar from "@/components/BaseCalendar";
import { FC, useState } from "react";
import React from "react";
import { TCalendarView } from "@/components/BaseCalendar/types";
import { TODAY } from "@/components/BaseCalendar/constants";
import CalendarButtonGroup from "./ButtonGroup";
import { IconButtonSx } from "./styles";
import CalendarHeader from "./Header";
import CalendarView from "./View";
import CalendarDayView from "./Views/Day";
import CalendarWeekView from "./Views/Week";

const NullButton = ({}: any) => null;

const CalendarIconButton: FC<IconButtonProps> = (props) => (
    <IconButton sx={IconButtonSx} {...props} />
);

const Calendar = () => {
    const [date, setDate] = useState(TODAY);
    const [view, setView] = useState<TCalendarView>("day");

    return (
        <Paper>
            <BaseCalendar
                date={date}
                view={view}
                onDateChange={setDate}
                onViewChange={setView}
                // ...
                slots={{
                    View: CalendarView,
                    Header: CalendarHeader,
                }}
                ViewSlots={{
                    DayView: CalendarDayView,
                    WeekView: CalendarWeekView,
                }}
                HeaderSlots={{
                    PreviousButton: CalendarIconButton,
                    NextButton: CalendarIconButton,
                    TodayButton: NullButton,
                    ViewButtonGroup: CalendarButtonGroup,
                }}
            />
        </Paper>
    );
};

export default React.memo(Calendar);
