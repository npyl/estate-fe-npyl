import {
    CalendarCellProps,
    CalendarWeekViewProps,
} from "@/components/Calendar/types";
import CalendarGoogleWeekView from "@/components/CalendarGoogle/Views/Week";
import { FC, useState } from "react";
import useTimeFromOffset from "./useTimeFromOffset";
import CalendarWeekViewCell from "@/components/Calendar/Views/Week/Cell";
const CreateEventDialog = dynamic(() => import("../Event/Create"));
import dynamic from "next/dynamic";
import useFilteredEvents from "./useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import useAuthenticatedClick from "./useAuthenticatedClick";
import WithEventClick from "./WithEventClick";

// --------------------------------------------------------------------------

const Cell = WithEventClick(CalendarWeekViewCell);

// --------------------------------------------------------------------------

interface CellProps extends CalendarCellProps {
    onClickWithOffset: (date: string) => void;
}

const CellWithTimeOffset: FC<CellProps> = ({ onClickWithOffset, ...props }) => {
    const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
    const { onAuthenticatedClick } = useAuthenticatedClick(onClick);
    return <Cell {...props} onClick={onAuthenticatedClick} />;
};

// --------------------------------------------------------------------------

const WeekView: FC<CalendarWeekViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    const { calendarId } = useFiltersContext();
    const { getCellEvents } = useFilteredEvents();

    return (
        <>
            <CalendarGoogleWeekView
                {...props}
                filters={{ calendarId }}
                getCellEvents={getCellEvents}
                Cell={(props) => (
                    <CellWithTimeOffset
                        {...props}
                        onClickWithOffset={setStartDate}
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

export default WeekView;
