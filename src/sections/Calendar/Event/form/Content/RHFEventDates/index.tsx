import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import EventDates, { EventDatesProps } from "./EventDates";
import { FC } from "react";

interface RHFEventDatesProps<T extends FieldValues>
    extends Omit<
        EventDatesProps,
        "startDate" | "endDate" | "onStartDateChange" | "onEndDateChange"
    > {
    startDateName: Path<T>;
    endDateName: Path<T>;
}

const RHFEventDates = <T extends FieldValues>({
    startDateName,
    endDateName,
    ...props
}: RHFEventDatesProps<T>) => {
    const { control } = useFormContext<T>();

    return (
        <Controller
            name={startDateName}
            control={control}
            render={({
                field: { value: startDate, onChange: onStartDateChange },
            }) => (
                <Controller
                    name={endDateName}
                    control={control}
                    render={({
                        field: { value: endDate, onChange: onEndDateChange },
                    }) => (
                        <EventDates
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={onStartDateChange}
                            onEndDateChange={onEndDateChange}
                            // ...
                            {...props}
                        />
                    )}
                />
            )}
        />
    );
};

export default RHFEventDates;
