import { Checkbox, FormControlLabel, Stack, StackProps } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFDateTimePicker from "@/components/hook-form/RHFDateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { END_HOUR, START_HOUR } from "@/constants/calendar";
import { DatePickerProps } from "@mui/lab";
import { RHFDatePicker } from "@/components/hook-form";
import { getAllDayStartEnd } from "@/components/Calendar/util";

// ----------------------------------------------------------------------

interface AllDayPickerProps {
    startDateKey: string;
    endDateKey: string;
}

const AllDayPicker: FC<AllDayPickerProps> = ({ startDateKey, endDateKey }) => {
    const { setValue } = useFormContext();

    const handleChange = useCallback((s: string) => {
        const [start, end] = getAllDayStartEnd(s);

        setValue(startDateKey, start, { shouldDirty: true });
        setValue(endDateKey, end, { shouldDirty: true });
    }, []);

    return <RHFDatePicker name={startDateKey} onChange={handleChange} />;
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

    // INFO: make this component reusable in many hook-form setups
    startDateKey?: string;
    endDateKey?: string;
}

const EventDates: FC<EventDatesProps> = ({
    allDay,
    onAllDayChange,
    // ...
    startDateKey = "startDate",
    endDateKey = "endDate",
    // ...
    ...props
}) => {
    const { t } = useTranslation();

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
                        startDateKey={startDateKey}
                        endDateKey={endDateKey}
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
                        // ...
                        {...DatePickerConstraints}
                    />
                    <RHFDateTimePicker
                        defaultValue={TODAY.hour(START_HOUR + 1)}
                        label={t("End")}
                        name={endDateKey}
                        //  ...
                        {...DatePickerConstraints}
                    />
                </Stack>
            ) : null}
        </Stack>
    );
};

export default EventDates;
