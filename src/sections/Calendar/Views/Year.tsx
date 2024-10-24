import { CalendarYearViewProps } from "@/components/Calendar/types";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import CalendarGoogleYearView, {
    CalendarGoogleYearViewCell,
} from "@/components/CalendarGoogle/Views/Year";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

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
                        // TODO: fix this (actually passed but types do not reflect that!)
                        events={[]}
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
