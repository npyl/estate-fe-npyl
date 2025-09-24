import { useCallback } from "react";
import {
    useFiltersContext,
    useSelectFromDate,
    useSelectToDate,
} from "./Context";
import DateRangePicker from "@/ui/DateRangePicker";

const DateSelect = () => {
    const { setFromDate, setToDate } = useFiltersContext();
    const startDate = useSelectFromDate();
    const endDate = useSelectToDate();

    const onChange = useCallback((startDate: string, endDate: string) => {
        setFromDate(startDate);
        setToDate(endDate);
    }, []);

    return (
        <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
        />
    );
};

export default DateSelect;
