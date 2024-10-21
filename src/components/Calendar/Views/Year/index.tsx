import YearView from "@/components/BaseCalendar/View/Year";
import { FC } from "react";
import { CalendarYearViewProps } from "../../types";
import { _getTodaysEvents } from "../util";
import dynamic from "next/dynamic";
const CalendarYearViewCell = dynamic(() => import("./Cell"));

// ------------------------------------------------------------

const Year: FC<CalendarYearViewProps> = ({
    events = [],
    Cell: PassedCell,
    date,
    // ...
    getCellEvents = _getTodaysEvents,
    onEventEdit,
    onEventDelete,
    // ...
    ...props
}) => {
    const Cell = PassedCell || CalendarYearViewCell;

    return (
        <YearView
            date={date}
            Cell={(props) => (
                <Cell
                    {...props}
                    events={getCellEvents(events, props.date)}
                    onEventEdit={onEventEdit}
                    onEventDelete={onEventDelete}
                />
            )}
            {...props}
        />
    );
};

export default Year;
