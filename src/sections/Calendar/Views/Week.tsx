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

// --------------------------------------------------------------------------

interface CellProps extends CalendarCellProps {
    onClickWithOffset: (date: string) => void;
}

const CellWithTimeOffset: FC<CellProps> = ({ onClickWithOffset, ...props }) => {
    const { onClick } = useTimeFromOffset(props.date, onClickWithOffset);
    return <CalendarWeekViewCell {...props} onClick={onClick} />;
};

// --------------------------------------------------------------------------

const WeekView: FC<CalendarWeekViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    const { getCellEvents } = useFilteredEvents();

    return (
        <>
            <CalendarGoogleWeekView
                {...props}
                getCellEvents={getCellEvents}
                Cell={(props) => (
                    <CellWithTimeOffset
                        // TODO: fix this (actually passed but types do not reflect that!)
                        events={[]}
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
