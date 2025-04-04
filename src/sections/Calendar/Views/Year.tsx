import {
    CalendarCellProps,
    CalendarYearViewProps,
} from "@/components/Calendar/types";
import { FC, useMemo } from "react";
import CalendarGoogleYearView from "@/components/CalendarGoogle/Views/Year";
import useMonthEvents from "@/components/CalendarGoogle/Views/useMonthEvents";
import CalendarYearViewCell from "@/components/Calendar/Views/Year/Cell";
import { useFiltersContext } from "../Filters/context";
import WithClick from "./_hocs/WithClick";

// --------------------------------------------------------------------------

const Cell = WithClick(CalendarYearViewCell);

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

const YearView: FC<CalendarYearViewProps> = ({ onEventClick, ...props }) => (
    <CalendarGoogleYearView
        {...props}
        Cell={(other) => (
            <CalendarGoogleYearViewCell
                {...other}
                onEventClick={onEventClick}
            />
        )}
    />
);

export default YearView;
