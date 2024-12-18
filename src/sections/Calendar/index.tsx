import CalendarGoogle from "@/components/CalendarGoogle";
import StyledHeader from "./Header";
import WithActions from "./WithActions";

import dynamic from "next/dynamic";

const Filters = dynamic(() => import("./Filters"));
import { FiltersProvider } from "./Filters/context";

const CalendarGoogleDayView = dynamic(() => import("./Views/Day"));
import CalendarGoogleWeekView from "./Views/Week";
const CalendarGoogleMonthView = dynamic(() => import("./Views/Month"));
const CalendarGoogleYearView = dynamic(() => import("./Views/Year"));

import useResponsive from "@/hooks/useResponsive";
import { useState } from "react";
import { TODAY } from "@/components/BaseCalendar/constants";

const MobileControls = dynamic(() => import("./MobileControls"));

const DayView = WithActions(CalendarGoogleDayView);
const WeekView = WithActions(CalendarGoogleWeekView);
const MonthView = WithActions(CalendarGoogleMonthView);
const YearView = WithActions(CalendarGoogleYearView);

const CalendarSection = () => {
    const belowMd = useResponsive("down", "md");

    const [date, setDate] = useState(TODAY);

    return (
        <FiltersProvider>
            <Filters />

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
                    DayView,
                    WeekView,
                    MonthView,
                    YearView,
                }}
                slots={{
                    Header: StyledHeader,
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
