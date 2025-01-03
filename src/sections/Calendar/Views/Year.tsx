import {
    CalendarCellProps,
    CalendarYearViewProps,
} from "@/components/Calendar/types";
import { FC, useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CalendarGoogleYearView from "@/components/CalendarGoogle/Views/Year";
import useMonthEvents from "@/components/CalendarGoogle/Views/useMonthEvents";
import CalendarYearViewCell from "@/components/Calendar/Views/Year/Cell";
import { useFiltersContext } from "../Filters/context";
import useAuthenticatedClick from "./useAuthenticatedClick";
import WithEventClick from "./WithEventClick";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

const Cell = WithEventClick(CalendarYearViewCell);

// --------------------------------------------------------------------------

export const CalendarGoogleYearViewCell: FC<CalendarCellProps> = (props) => {
    const { calendarId, type } = useFiltersContext();

    const { data } = useMonthEvents(props.date, { calendarId });

    // INFO: minor filtering
    const events = useMemo(() => {
        if (type === "ANY") return data || [];

        return data?.filter(({ type: _t }) => _t === type) || [];
    }, [data, type]);

    return <Cell {...props} events={events} />;
};

// --------------------------------------------------------------------------

const YearView: FC<CalendarYearViewProps> = ({ onEventClick, ...props }) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    const handleClick = useCallback((s: string) => () => setStartDate(s), []);
    const { onAuthenticatedClick } = useAuthenticatedClick(handleClick);

    return (
        <>
            <CalendarGoogleYearView
                {...props}
                Cell={(other) => (
                    <CalendarGoogleYearViewCell
                        {...other}
                        onEventClick={onEventClick}
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

export default YearView;
