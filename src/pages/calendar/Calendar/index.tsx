import { useCallback, useState } from "react";
import { TCalendarView } from "./types";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import YearIcon from "./YearIcon";
import View from "./View";

const Calendar = () => {
    const [view, setView] = useState<TCalendarView>("month");

    const handleChange = useCallback(
        (_: any, v: TCalendarView) => setView(v),
        []
    );

    return (
        <>
            <ToggleButtonGroup exclusive value={view} onChange={handleChange}>
                <ToggleButton value="day">
                    <TodayIcon />
                </ToggleButton>
                <ToggleButton value="week">
                    <DateRangeIcon />
                </ToggleButton>
                <ToggleButton value="month">
                    <CalendarMonthIcon />
                </ToggleButton>
                <ToggleButton value="year">
                    <YearIcon />
                </ToggleButton>
            </ToggleButtonGroup>

            <View view={view} />
        </>
    );
};

export default Calendar;
