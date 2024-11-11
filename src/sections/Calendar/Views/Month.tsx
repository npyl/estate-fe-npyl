import { CalendarMonthViewProps } from "@/components/Calendar/types";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import CalendarGoogleMonthView from "@/components/CalendarGoogle/Views/Month";
import CalendarMonthViewCell from "@/components/Calendar/Views/Month/Cell";
import useFilteredEvents from "./useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

const MonthView: FC<CalendarMonthViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    const { calendarId } = useFiltersContext();
    const { getCellEvents } = useFilteredEvents();

    return (
        <>
            <CalendarGoogleMonthView
                {...props}
                filters={{ calendarId }}
                getCellEvents={getCellEvents}
                Cell={(props) => (
                    <CalendarMonthViewCell
                        {...props}
                        onClick={() => setStartDate(props.date.toISOString())}
                    />
                )}
            />

            {startDate ? (
                <CreateEventDialog
                    startDate={startDate}
                    onClose={closeDialog}
                />
            ) : null}
        </>
    );
};

export default MonthView;
