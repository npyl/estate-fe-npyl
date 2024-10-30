import {
    CalendarCellProps,
    CalendarYearViewProps,
} from "@/components/Calendar/types";
import { FC, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CalendarGoogleYearView from "@/components/CalendarGoogle/Views/Year";
import useMonthEvents from "@/components/CalendarGoogle/Views/useMonthEvents";
import CalendarYearViewCell from "@/components/Calendar/Views/Year/Cell";
import { useFiltersContext } from "../Filters/context";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

export const CalendarGoogleYearViewCell: FC<CalendarCellProps> = (props) => {
    const { data } = useMonthEvents(props.date);

    const { type } = useFiltersContext();

    // INFO: minor filtering
    const events = useMemo(() => {
        if (type === "ANY") return data || [];

        return data?.filter(({ type: _t }) => _t === type) || [];
    }, [data, type]);

    return <CalendarYearViewCell {...props} events={events} />;
};

// --------------------------------------------------------------------------

const YearView: FC<CalendarYearViewProps> = ({ onEventClick, ...props }) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    return (
        <>
            <CalendarGoogleYearView
                {...props}
                Cell={(other) => (
                    <CalendarGoogleYearViewCell
                        {...other}
                        onEventClick={onEventClick}
                        onClick={() => setStartDate(other.date.toISOString())}
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
