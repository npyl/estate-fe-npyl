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
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

interface CellProps extends CalendarCellProps {
    onClickWithOffset: (date: string) => void;
}

const CellWithTimeOffset: FC<CellProps> = ({ onClickWithOffset, ...props }) => {
    const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
    return <CalendarDayViewCell {...props} onClick={onClick} />;
};

// --------------------------------------------------------------------------

const DayView: FC<CalendarDayViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    const { getCellEvents } = useFilteredEvents();

    return (
        <>
            <CalendarGoogleDayView
                {...props}
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
