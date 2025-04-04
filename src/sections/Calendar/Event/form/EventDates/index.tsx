import {
    Checkbox,
    FormControlLabel,
    Stack,
    StackProps,
    Typography,
} from "@mui/material";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { RHFDatePicker } from "@/components/hook-form";
import { getAllDayStartEnd } from "@/components/Calendar/util";
import RHFTimePicker from "@/components/hook-form/RHFTimePicker";

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
        <Stack spacing={1} {...props}>
            <Stack direction="row" spacing={1} alignItems="center">
                {allDay ? (
                    <AllDayPicker
                        startDateKey={startDateKey}
                        endDateKey={endDateKey}
                    />
                ) : null}

                {!allDay ? <RHFDatePicker name={startDateKey} /> : null}

                <FormControlLabel
                    label={t("All day")}
                    control={<Checkbox />}
                    checked={allDay}
                    onChange={onAllDayChange}
                    sx={CheckboxSx}
                />
            </Stack>

            {!allDay ? (
                <Stack direction="row" spacing={1} alignItems="center">
                    <RHFTimePicker name={startDateKey} />
                    <Typography>-</Typography>
                    <RHFTimePicker name={endDateKey} />
                </Stack>
            ) : null}
        </Stack>
    );
};

export default EventDates;
