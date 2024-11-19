import { Checkbox, FormControlLabel, Stack, StackProps } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFDateTimePicker from "./RHFDateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { END_HOUR, START_HOUR } from "@/constants/calendar";
import { DatePickerProps } from "@mui/lab";

// ----------------------------------------------------------------------

interface AllDayPickerProps {
    date: string;
    onChange: (v: string) => void;
}

const AllDayPicker: FC<AllDayPickerProps> = ({ date, onChange }) => {
    const { t } = useTranslation();

    const handleFullDate = useCallback((v: dayjs.Dayjs | null) => {
        if (!v) return;
        onChange(v.toISOString());
    }, []);

    return (
        <DatePicker
            label={t("Day")}
            value={date ? dayjs(date) : null}
            onChange={handleFullDate}
        />
    );
};

// ----------------------------------------------------------------------

const shouldDisableTime = (
    time: Dayjs,
    type: "hours" | "minutes" | "seconds"
) => {
    if (type === "hours") {
        const hour = time.hour();
        return hour < START_HOUR || hour > END_HOUR;
    }

    return false;
};

const TODAY = dayjs();
const MIN_TIME = TODAY.hour(START_HOUR);
const MAX_TIME = TODAY.hour(END_HOUR);

const DatePickerConstraints: DatePickerProps<Dayjs> = {
    ampm: false,
    skipDisabled: true,
    minTime: MIN_TIME,
    maxTime: MAX_TIME,
    shouldDisableTime,
};

const CheckboxSx = {
    width: "fit-content",
};

export interface EventDatesProps extends StackProps {
    allDay: boolean;
    onAllDayChange: (_: any, b: boolean) => void;

    allDayDate: string;
    onAllDayDateChange: (s: string) => void;

    // INFO: make this component reusable in many hook-form setups
    startDateKey?: string;
    endDateKey?: string;
}

const EventDates: FC<EventDatesProps> = ({
    allDay,
    onAllDayChange,
    // ...
    allDayDate,
    onAllDayDateChange,

    startDateKey = "startDate",
    endDateKey = "endDate",

    ...props
}) => {
    const { t } = useTranslation();
    const { setValue } = useFormContext();

    const handleStartDate = useCallback((v: dayjs.Dayjs | null) => {
        if (!v) return;
        setValue(startDateKey, v.toISOString(), { shouldDirty: true });
    }, []);
    const handleEndDate = useCallback((v: dayjs.Dayjs | null) => {
        if (!v) return;
        setValue(endDateKey, v.toISOString(), { shouldDirty: true });
    }, []);

    return (
        <Stack {...props}>
            <Stack direction="row" spacing={1} alignItems="center">
                <FormControlLabel
                    label={t("All day")}
                    control={<Checkbox />}
                    checked={allDay}
                    onChange={onAllDayChange}
                    sx={CheckboxSx}
                />

                {allDay ? (
                    <AllDayPicker
                        date={allDayDate}
                        onChange={onAllDayDateChange}
                    />
                ) : null}
            </Stack>

            {!allDay ? (
                <Stack
                    direction="row"
                    gap={1}
                    flexDirection={{
                        xs: "column",
                        sm: "row",
                    }}
                >
                    <RHFDateTimePicker
                        defaultValue={MIN_TIME}
                        label={t("Start")}
                        name={startDateKey}
                        onChange={handleStartDate}
                        // ...
                        {...DatePickerConstraints}
                    />
                    <RHFDateTimePicker
                        defaultValue={TODAY.hour(START_HOUR + 1)}
                        label={t("End")}
                        name={endDateKey}
                        onChange={handleEndDate}
                        //  ...
                        {...DatePickerConstraints}
                    />
                </Stack>
            ) : null}
        </Stack>
    );
};

export default EventDates;
