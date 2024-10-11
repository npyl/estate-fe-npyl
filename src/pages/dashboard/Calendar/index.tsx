import { Button, IconButton, IconButtonProps } from "@mui/material";
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

const NullButton = ({}: any) => null;

const CalendarIconButton: FC<IconButtonProps> = (props) => (
    <IconButton sx={IconButtonSx} {...props} />
);

const Calendar = () => {
    const [date, setDate] = useState(TODAY);
    const [view, setView] = useState<TCalendarView>("day");

    return (
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
            }}
            HeaderSlots={{
                PreviousButton: CalendarIconButton,
                NextButton: CalendarIconButton,
                TodayButton: view === "day" ? NullButton : Button,
                ViewButtonGroup: CalendarButtonGroup,
            }}
        />
    );
};

export default React.memo(Calendar);
