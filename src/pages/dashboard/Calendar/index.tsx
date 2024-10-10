import { Button, IconButton, IconButtonProps } from "@mui/material";
import BaseCalendar from "@/components/BaseCalendar";
import { FC, useState } from "react";
import React from "react";
import BaseView from "@/components/BaseCalendar/View";
import {
    BaseCalendarViewProps,
    TCalendarView,
} from "@/components/BaseCalendar/types";
import { TODAY } from "@/components/BaseCalendar/constants";

const IconButtonSx = {
    borderRadius: "20px",
};

const CalendarIconButton: FC<IconButtonProps> = (props) => (
    <IconButton sx={IconButtonSx} {...props} />
);

const CalendarView: FC<BaseCalendarViewProps> = (props) => (
    <BaseView
        {...props}
        style={{
            width: "100%",
            backgroundColor: "",
        }}
    />
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
            }}
            HeaderSlots={{
                PreviousButton: CalendarIconButton,
                NextButton: CalendarIconButton,
                TodayButton: Button,
            }}
        />
    );
};

export default React.memo(Calendar);
