import { IconButton, IconButtonProps, Paper } from "@mui/material";
import BaseCalendar from "@/components/BaseCalendar";
import { FC, useState } from "react";
import React from "react";
import {
    BaseCalendarDayViewProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import { TODAY } from "@/components/BaseCalendar/constants";

import CalendarHeader from "@/components/Calendar/Header";
import CalendarView from "@/components/Calendar/View";
import CalendarDayView from "@/components/Calendar/Views/Day";

const NullButtonGroup = ({}: any) => null;

const MiniDayView: FC<BaseCalendarDayViewProps> = (props) => (
    <CalendarDayView
        {...props}
        style={{
            height: "300px",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
        }}
    />
);

const IconButtonSx = {
    borderRadius: "20px",
};

const PaperSx = {
    borderRadius: "15px",
};

const CalendarIconButton: FC<IconButtonProps> = (props) => (
    <IconButton sx={IconButtonSx} {...props} />
);

const SimpleCalendar = () => {
    const [date, setDate] = useState(TODAY);
    const [view, setView] = useState<TCalendarView>("day");

    return (
        <Paper sx={PaperSx}>
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
                    DayView: MiniDayView,
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
