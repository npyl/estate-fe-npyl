import DatePickerProvider from "@/providers/DatePicker";
import RHFDatePicker, {
    RHFDatePickerProps,
} from "@/components/hook-form/RHFDatePicker";
import Form from "./Form";
import { FormReq } from "./types";
import Value from "./Value";
import { DATEPICKER_TESTID } from "./constants";

interface TesterProps extends Omit<RHFDatePickerProps<FormReq>, "name"> {
    formValues?: FormReq;
}

const Tester = ({ formValues, ...props }: TesterProps) => (
    <DatePickerProvider>
        <Form values={formValues}>
            <RHFDatePicker<FormReq>
                data-testid={DATEPICKER_TESTID}
                name="myDate"
                {...props}
            />
            <Value />
        </Form>
    </DatePickerProvider>
);

export type { TesterProps };
export default Tester;
