import { useState } from "react";
import { TCalendarView } from "./types";

import View from "./View";

import { TODAY } from "./constants";
import Header from "./Header";

const Calendar = () => {
    const [date, setDate] = useState(TODAY);
    const [view, setView] = useState<TCalendarView>("month");

    return (
        <>
            <Header
                date={date}
                view={view}
                // ...
                onDateChange={setDate}
                onViewChange={setView}
            />

            <View view={view} date={date} />
        </>
    );
};

export default Calendar;
