import { TCalendarEventType } from "@/components/Calendar/types";
import { useWatch } from "react-hook-form";
const Tour = dynamic(() => import("./Tour"));
const Meeting = dynamic(() => import("./Meeting"));
import dynamic from "next/dynamic";

const People = () => {
    const type = useWatch({ name: "type" }) as TCalendarEventType;

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
