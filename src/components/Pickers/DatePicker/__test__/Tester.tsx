import DatePickerProvider from "@/providers/DatePicker";
import DatePicker, { DatePickerProps } from "@/components/Pickers/DatePicker";

const Tester = (props: DatePickerProps) => (
    <DatePickerProvider>
        <DatePicker {...props} />
    </DatePickerProvider>
);

export default Tester;
