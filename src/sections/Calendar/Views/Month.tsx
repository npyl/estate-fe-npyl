import { CalendarMonthViewProps } from "@/components/Calendar/types";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import CalendarGoogleMonthView from "@/components/CalendarGoogle/Views/Month";
import CalendarMonthViewCell from "@/components/Calendar/Views/Month/Cell";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

const MonthView: FC<CalendarMonthViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    return (
        <>
            <CalendarGoogleMonthView
                {...props}
                Cell={(props) => (
                    <CalendarMonthViewCell
                        // TODO: fix this (actually passed but types do not reflect that!)
                        events={[]}
                        {...props}
                        onClick={() => setStartDate(props.date.toISOString())}
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
