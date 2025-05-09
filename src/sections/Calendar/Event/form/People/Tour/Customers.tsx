import { useTranslation } from "react-i18next";
import CustomerAutocomplete from "@/sections/_Autocompletes/CustomerMultiple";
import {
    Controller,
    ControllerFieldState,
    ControllerRenderProps,
    useFormContext,
    UseFormStateReturn,
} from "react-hook-form";
import { peopleKey } from "../constants";
import { useCallback, useMemo } from "react";
import { TCalendarEventPerson } from "@/components/Calendar/types";
import { CalendarEventReq } from "@/types/calendar";

const isPPCustomer = ({ customerId }: TCalendarEventPerson) =>
    Boolean(customerId);

const isNotPPCustomer = (p: TCalendarEventPerson) => !isPPCustomer(p);

const getCustomerId = ({ customerId }: TCalendarEventPerson) => customerId!;

type RenderProps = {
    field: ControllerRenderProps<CalendarEventReq, "people">;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<CalendarEventReq>;
};

const Render = ({
    field: { value: _value, onChange, ...field },
    fieldState: { error },
}: RenderProps) => {
    const { t } = useTranslation();

    const value = useMemo(
        () => _value?.filter(isPPCustomer)?.map(getCustomerId) || [],
        [_value]
    );

    const handleChange = useCallback(
        (v: number[]) => {
            const customers = v?.map((customerId) => ({ customerId }));
            const nonCustomers = _value?.filter(isNotPPCustomer) || [];
            onChange([...customers, ...nonCustomers]);
        },
        [_value, onChange]
    );

    return (
        <CustomerAutocomplete
            multiple
            label={t<string>("Customers")}
            value={value}
            onChange={handleChange}
            {...field}
            error={Boolean(error)}
            helperText={error?.message}
        />
    );
};

const Customers = () => {
    const { control } = useFormContext<CalendarEventReq>();
    return <Controller name={peopleKey} control={control} render={Render} />;
};

export default Customers;
