import RHFEventDates from "@/sections/Calendar/Event/form/Content/RHFEventDates";
import Form from "./Form";
import Values from "./Values";
import { FC } from "react";
import { FormReq } from "./types";
import DatePickerProvider from "@/providers/DatePicker";

interface TesterProps extends Partial<FormReq> {}

const Tester: FC<TesterProps> = (props) => (
    <DatePickerProvider>
        <Form {...props}>
            <RHFEventDates startDateName="startDate" endDateName="endDate" />
            <Values />
        </Form>
    </DatePickerProvider>
);

export default Tester;
