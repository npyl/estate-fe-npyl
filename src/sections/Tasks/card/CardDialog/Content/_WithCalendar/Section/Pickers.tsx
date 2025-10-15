import RHFEventDates from "@/sections/Calendar/Event/form/Content/RHFEventDates";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";

const Pickers = () => (
    <RHFEventDates<ICreateOrUpdateTaskReq>
        startDateName="due.0"
        endDateName="due.1"
        // ...
        direction="column"
    />
);

export default Pickers;
