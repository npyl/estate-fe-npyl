import { CalendarYearViewProps } from "@/components/Calendar/types";
import { FC, useState } from "react";
import dynamic from "next/dynamic";
import CalendarYearViewCell from "@/components/Calendar/Views/Year/Cell";
import CalendarGoogleYearView from "@/components/CalendarGoogle/Views/Year";
const CreateEventDialog = dynamic(() => import("../Event/Create"));

// --------------------------------------------------------------------------

const YearView: FC<CalendarYearViewProps> = (props) => {
    const [startDate, setStartDate] = useState("");
    const closeDialog = () => setStartDate("");

    return (
        <>
            <CalendarGoogleYearView
                {...props}
                Cell={(props) => (
                    <CalendarYearViewCell
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

export default YearView;
