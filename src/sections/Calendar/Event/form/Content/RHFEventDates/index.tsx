import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Render, { RenderProps } from "./Render";

interface RHFEventDatesProps
    extends Omit<
        RenderProps,
        "startDate" | "endDate" | "onStartDateChange" | "onEndDateChange"
    > {
    startDateName: string;
    endDateName: string;
}

const RHFEventDates: FC<RHFEventDatesProps> = ({
    startDateName,
    endDateName,
    ...props
}) => {
    const { control } = useFormContext();

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
                        <Render
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
