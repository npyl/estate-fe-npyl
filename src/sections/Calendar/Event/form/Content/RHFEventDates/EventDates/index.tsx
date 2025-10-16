import { Stack, StackProps } from "@mui/material";
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
import useSafeChange from "./useSafeChange";

// ----------------------------------------------------------------------

interface EventDatesProps extends StackProps {
    startDate: string;
    endDate: string;
    onStartDateChange: (d: string) => void;
    onEndDateChange: (d: string) => void;
}

const EventDates: FC<EventDatesProps> = ({
    startDate,
    endDate,
    onStartDateChange: _onStartDateChange,
    onEndDateChange: _onEndDateChange,
    // ...
    ...props
}) => {
    const allDay = isAllDay(startDate, endDate);

    const { onStartDateChange, onEndDateChange } = useSafeChange(
        startDate,
        endDate,
        _onStartDateChange,
        _onEndDateChange
    );

    return (
        <Stack spacing={1} {...props}>
            <Stack direction="row" spacing={1} alignItems="center">
                <DatePicker
                    data-testid={DATEPICKER_TESTID}
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={_onStartDateChange}
                    onEndDateChange={_onEndDateChange}
                />

                <AllDayCheckbox
                    data-testid={ALL_DAY_CHECKBOX_TESTID}
                    allDay={allDay}
                    startDate={startDate}
                    onStartDateChange={_onStartDateChange}
                    onEndDateChange={_onEndDateChange}
                />
            </Stack>

            {allDay ? null : (
                <Stack direction="row" spacing={1} alignItems="center">
                    <StartHourPicker
                        data-testid={START_TIME_PICKER_TESTID}
                        value={startDate}
                        onChange={onStartDateChange}
                    />
                    <EndHourPicker
                        data-testid={END_TIME_PICKER_TESTID}
                        value={endDate}
                        onChange={onEndDateChange}
                    />
                </Stack>
            )}
        </Stack>
    );
};

export type { EventDatesProps };
export default EventDates;
