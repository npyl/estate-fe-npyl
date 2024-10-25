import BaseCalendar from "@/components/BaseCalendar";
import { FC, useCallback, useState } from "react";
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

    date,
    onDateChange,
    view,
    onViewChange,
    // ...
    slots,
    HeaderSlots,
    ViewSlots,
}) => {
    // internal state (for uncontrolled use)
    const [_date, _setDate] = useState(TODAY);
    const [_view, _setView] = useState<TCalendarView>(initialView);

    const handleViewChange = useCallback(
        (v: TCalendarView) => {
            _setView(v);
            onViewChange?.(v);
        },
        [onViewChange]
    );

    const handleDateChange = useCallback(
        (d: Date) => {
            _setDate(d);
            onDateChange?.(d);
        },
        [onDateChange]
    );

    return (
        <BaseCalendar
            date={date || _date}
            view={view || _view}
            onDateChange={handleDateChange}
            onViewChange={handleViewChange}
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
