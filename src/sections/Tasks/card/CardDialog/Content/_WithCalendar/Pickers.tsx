import { endDateKey, startDateKey } from "./constants";
import RHFEventDates from "@/sections/Calendar/Event/form/Content/RHFEventDates";

const Pickers = () => (
    <RHFEventDates
        startDateName={startDateKey}
        endDateName={endDateKey}
        // ...
        direction="column"
    />
);

export default Pickers;
