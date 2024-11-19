import { CalendarMonthViewProps } from "@/components/Calendar/types";
import { FC, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import CalendarGoogleMonthView from "@/components/CalendarGoogle/Views/Month";
import CalendarMonthViewCell from "@/components/Calendar/Views/Month/Cell";
import useFilteredEvents from "./useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import useAuthenticatedClick from "./useAuthenticatedClick";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

const MonthView: FC<CalendarMonthViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    const { calendarId } = useFiltersContext();
    const { getCellEvents } = useFilteredEvents();

    const handleClick = useCallback((s: string) => () => setStartDate(s), []);
    const { onAuthenticatedClick } = useAuthenticatedClick(handleClick);

    return (
        <>
            <CalendarGoogleMonthView
                {...props}
                filters={{ calendarId }}
                getCellEvents={getCellEvents}
                Cell={(other) => (
                    <CalendarMonthViewCell
                        {...other}
                        onClick={onAuthenticatedClick?.(
                            other.date.toISOString()
                        )}
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
