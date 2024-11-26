import { TCalendarEventType } from "@/components/Calendar/types";
import { useFormContext } from "react-hook-form";
const Tour = dynamic(() => import("./Tour"));
const Meeting = dynamic(() => import("./Meeting"));
import dynamic from "next/dynamic";

const People = () => {
    const { watch } = useFormContext();

    const type = watch("type") as TCalendarEventType;

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
