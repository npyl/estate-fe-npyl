import CalendarGoogle from "@/components/CalendarGoogle";
import { FiltersProvider } from "./Filters/context";
import dynamic from "next/dynamic";

const CalendarGoogleDayView = dynamic(() => import("./Views/Day"));
import CalendarGoogleWeekView from "./Views/Week";
const CalendarGoogleMonthView = dynamic(() => import("./Views/Month"));
const CalendarGoogleYearView = dynamic(() => import("./Views/Year"));

const Filters = dynamic(() => import("./Filters"));

import useResponsive from "@/hooks/useResponsive";
import { useState } from "react";
import { TODAY } from "@/components/BaseCalendar/constants";
import View from "./View";
import Header from "./Header";
import Box from "@mui/material/Box";

const MobileControls = dynamic(() => import("./MobileControls"));

const CalendarSection = () => {
    const belowMd = useResponsive("down", "md");

    const [date, setDate] = useState(TODAY);

    return (
        <FiltersProvider onDateChange={setDate}>
            <Filters />

            <Box mt={1} />

            {/* Account + date controls */}
            {belowMd ? (
                <MobileControls date={date} onDateChange={setDate} />
            ) : null}

            <CalendarGoogle
                date={date}
                onDateChange={setDate}
                view={belowMd ? "day" : undefined}
                // ...
                ViewSlots={{
                    DayView: CalendarGoogleDayView,
                    WeekView: CalendarGoogleWeekView,
                    MonthView: CalendarGoogleMonthView,
                    YearView: CalendarGoogleYearView,
                }}
                slots={{
                    Header,
                    View,
                }}
                HeaderSlots={{
                    // disable on mobile
                    ...(belowMd ? { ViewButtonGroup: undefined } : {}),
                }}
            />
        </FiltersProvider>
    );
};

export default CalendarSection;
