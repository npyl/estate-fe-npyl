import {
    CalendarCellProps,
    CalendarDayViewProps,
} from "@/components/Calendar/types";
import CalendarGoogleDayView from "@/components/CalendarGoogle/Views/Day";
import { FC, useState } from "react";
import useTimeFromOffset from "./useTimeFromOffset";
import dynamic from "next/dynamic";
import CalendarDayViewCell from "@/components/Calendar/Views/Day/Cell";
import useFilteredEvents from "./useFilteredEvents";
import { useFiltersContext } from "../Filters/context";
import useAuthenticatedCallback from "./useAuthenticatedClick";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

interface CellProps extends CalendarCellProps {
    onClickWithOffset: (date: string) => void;
}

const CellWithTimeOffset: FC<CellProps> = ({ onClickWithOffset, ...props }) => {
    const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
    const { onAuthenticatedClick } = useAuthenticatedCallback(onClick);

    return <CalendarDayViewCell {...props} onClick={onAuthenticatedClick} />;
};

// --------------------------------------------------------------------------

const DayView: FC<CalendarDayViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    const { calendarId } = useFiltersContext();
    const { getCellEvents } = useFilteredEvents();

    return (
        <>
            <CalendarGoogleDayView
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

export default DayView;
