import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFDateTimePicker from "@/components/hook-form/RHFDateTimePicker";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

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

const CheckboxSx = {
    width: "fit-content",
};

interface EventDatesProps {
    allDay: boolean;
    onAllDayChange: (_: any, b: boolean) => void;

    allDayDate: string;
    onAllDayDateChange: (s: string) => void;
}

const EventDates: FC<EventDatesProps> = ({
    allDay,
    onAllDayChange,
    // ...
    allDayDate,
    onAllDayDateChange,
}) => {
    const { t } = useTranslation();
    const { setValue } = useFormContext();

    const handleStartDate = useCallback((v: dayjs.Dayjs | null) => {
        if (!v) return;
        setValue("startDate", v.toISOString(), { shouldDirty: true });
    }, []);
    const handleEndDate = useCallback((v: dayjs.Dayjs | null) => {
        if (!v) return;
        setValue("endDate", v.toISOString(), { shouldDirty: true });
    }, []);

    return (
        <>
            <Stack direction="row" spacing={1}>
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
                <Stack direction="row" spacing={1}>
                    <RHFDateTimePicker
                        label={t("Start")}
                        name="startDate"
                        onChange={handleStartDate}
                    />
                    <RHFDateTimePicker
                        label={t("End")}
                        name="endDate"
                        onChange={handleEndDate}
                    />
                </Stack>
            ) : null}
        </>
    );
};

export default EventDates;
