import BaseCalendar from "@/components/BaseCalendar";
import { FC, useState } from "react";
import React from "react";
import dynamic from "next/dynamic";
import { TCalendarView } from "@/components/BaseCalendar/types";
import { TODAY } from "@/components/BaseCalendar/constants";
import { CalendarProps } from "./types";
// Slots
import CalendarHeader from "./Header";
const CalendarDayView = dynamic(() => import("./Views/Day"));
import CalendarWeekView from "./Views/Week";
const CalendarMonthView = dynamic(() => import("./Views/Month"));
const CalendarYearView = dynamic(() => import("./Views/Year"));
import CalendarIconButton from "./Controls";
import CalendarButtonGroup from "./ButtonGroup";

const Calendar: FC<CalendarProps> = ({
    initialView = "week",
    slots,
    HeaderSlots,
    ViewSlots,
}) => {
    const [date, setDate] = useState(TODAY);
    const [view, setView] = useState<TCalendarView>(initialView);

    return (
        <BaseCalendar
            date={date}
            view={view}
            onDateChange={setDate}
            onViewChange={setView}
            // ...
            slots={{
                Header: CalendarHeader,
                ...slots,
            }}
            ViewSlots={{
                DayView: CalendarDayView,
                WeekView: CalendarWeekView,
                MonthView: CalendarMonthView,
                YearView: CalendarYearView,
                ...ViewSlots,
            }}
            HeaderSlots={{
                PreviousButton: CalendarIconButton,
                NextButton: CalendarIconButton,
                ViewButtonGroup: CalendarButtonGroup,
                ...HeaderSlots,
            }}
        />
    );
};

export default React.memo(Calendar);
