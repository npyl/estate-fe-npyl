import { Stack, StackProps, Typography } from "@mui/material";
import { FC } from "react";
import { DatePicker, StartHourPicker, EndHourPicker } from "./Pickers";
import { isAllDay } from "@/components/Calendar/util";
import AllDayCheckbox from "./AllDayCheckbox";
import {
    DATEPICKER_TESTID,
    ALL_DAY_CHECKBOX_TESTID,
    END_TIME_PICKER_TESTID,
    START_TIME_PICKER_TESTID,
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
                <DatePicker
                    data-testid={DATEPICKER_TESTID}
                    allDay={allDay}
                    startDateKey={startDateKey}
                    onEndDateChange={onEndDateChange}
                />

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
                    <StartHourPicker
                        data-testid={START_TIME_PICKER_TESTID}
                        name={startDateKey}
                    />
                    <Typography>-</Typography>
                    <EndHourPicker
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
