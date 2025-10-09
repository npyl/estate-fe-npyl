import { Stack, StackProps, Typography } from "@mui/material";
import { FC } from "react";
import { RHFDatePicker } from "@/components/hook-form";
import RHFTimePicker from "@/components/hook-form/RHFTimePicker";
import AllDayPicker from "./AllDayPicker";
import { isAllDay } from "@/components/Calendar/util";
import AllDayCheckbox from "./AllDayCheckbox";
import {
    DATEPICKER_TESTID,
    END_TIME_PICKER_TESTID,
    START_TIME_PICKER_TESTID,
    // ...
    ALL_DAY_CHECKBOX_TESTID,
    ALL_DAY_DATEPICKER_TESTID,
} from "./constants";

// ----------------------------------------------------------------------

interface EventDatesProps extends StackProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (d: string) => void;
    onEndDateChange: (d: string) => void;

    // INFO: make this component reusable in many hook-form setups
    startDateKey?: string;
    endDateKey?: string;
}

const EventDates: FC<EventDatesProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    // ...
    startDateKey = "startDate",
    endDateKey = "endDate",
    // ...
    ...props
}) => {
    const allDay = isAllDay(startDate, endDate);

    return (
        <Stack spacing={1} {...props}>
            <Stack direction="row" spacing={1} alignItems="center">
                {allDay ? (
                    <AllDayPicker
                        data-testid={ALL_DAY_DATEPICKER_TESTID}
                        startDateKey={startDateKey}
                        onEndDateChange={onEndDateChange}
                    />
                ) : null}

                {!allDay ? (
                    <RHFDatePicker
                        data-testid={DATEPICKER_TESTID}
                        name={startDateKey}
                    />
                ) : null}

                <AllDayCheckbox
                    data-testid={ALL_DAY_CHECKBOX_TESTID}
                    allDay={allDay}
                    startDate={startDate}
                    onStartDateChange={onStartDateChange}
                    onEndDateChange={onEndDateChange}
                />
            </Stack>

            {!allDay ? (
                <Stack direction="row" spacing={1} alignItems="center">
                    <RHFTimePicker
                        data-testid={START_TIME_PICKER_TESTID}
                        name={startDateKey}
                    />
                    <Typography>-</Typography>
                    <RHFTimePicker
                        data-testid={END_TIME_PICKER_TESTID}
                        name={endDateKey}
                    />
                </Stack>
            ) : null}
        </Stack>
    );
};

export type { EventDatesProps };
export default EventDates;
