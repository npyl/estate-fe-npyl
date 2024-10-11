import { IconButton, IconButtonProps, Paper } from "@mui/material";
import BaseCalendar from "@/components/BaseCalendar";
import { FC, useState } from "react";
import React from "react";
import { TCalendarView } from "@/components/BaseCalendar/types";
import { TODAY } from "@/components/BaseCalendar/constants";

import CalendarHeader from "@/components/Calendar/Header";
import CalendarView from "@/components/Calendar/View";
import CalendarDayView from "@/components/Calendar/Views/Day";

const NullButtonGroup = ({}: any) => null;

const IconButtonSx = {
    borderRadius: "20px",
};

const CalendarIconButton: FC<IconButtonProps> = (props) => (
    <IconButton sx={IconButtonSx} {...props} />
);

const SimpleCalendar = () => {
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
                }}
                HeaderSlots={{
                    PreviousButton: CalendarIconButton,
                    NextButton: CalendarIconButton,
                    ViewButtonGroup: NullButtonGroup,
                }}
            />
        </Paper>
    );
};

export default React.memo(SimpleCalendar);
