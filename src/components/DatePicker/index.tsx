import { Calendar, DateObject } from "react-multi-date-picker";
import { CalendarBox } from "./styled";

type DatePickerProps = {
    dateFrom: string;
    dateTo: string;
    onSelect: (dates: DateObject[]) => void;
};

const DatePicker: React.FC<DatePickerProps> = ({
    dateFrom,
    dateTo,
    onSelect,
}) => {
    return (
        <CalendarBox isSingleDate={(dateFrom !== "") !== (dateTo !== "")}>
            <Calendar
                value={[dateFrom, dateTo]}
                onChange={onSelect}
                range
                rangeHover
                highlightToday={false}
                numberOfMonths={2}
                monthYearSeparator=" "
                showOtherDays
                weekStartDayIndex={1}
                format="DD/MM/YYYY"
                maxDate={new Date()}
            />
        </CalendarBox>
    );
};

export default DatePicker;
