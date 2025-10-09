import { useWatch } from "react-hook-form";
const Tour = dynamic(() => import("./Tour"));
const Meeting = dynamic(() => import("./Meeting"));
import dynamic from "next/dynamic";
import { CalendarEventReq } from "@/types/calendar";

const People = () => {
    const type = useWatch<CalendarEventReq>({ name: "type" });

    return (
        <>
            {type === "MEETING" ? <Meeting /> : null}
            {type === "TOUR_INPERSON" || type === "TOUR_ONLINE" ? (
                <Tour />
            ) : null}
        </>
    );
};

export default People;
