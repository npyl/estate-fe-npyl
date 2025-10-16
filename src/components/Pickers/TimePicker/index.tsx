import { forwardRef, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { DEFAULT_MAX_TIME, DEFAULT_MIN_TIME } from "./constants";
import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { END_HOUR, START_HOUR } from "@/constants/calendar";
import MenuItem from "@mui/material/MenuItem";
import { SxProps, Theme } from "@mui/material/styles";

// ------------------------------------------------------------------

const formatTimeDisplay = (isoString: string): string =>
    dayjs(isoString).format("h:mm A");

const getOption = (d: string, dataTestId: string) => (
    <MenuItem data-testid={dataTestId} key={d} value={d}>
        {formatTimeDisplay(d)}
    </MenuItem>
);

// ------------------------------------------------------------------

const getOptionTestId = (
    hour: number,
    minute: number,
    ampm: "am" | "pm",
    mainDataTestId: string = "PPTimePicker"
) => `${mainDataTestId}-Option-${hour}-${minute}-${ampm}`;

const generateTimeSlots = (
    value: string,
    mainDataTestId: string,
    startHour: number = START_HOUR,
    endHour: number = END_HOUR
) => {
    const slots: JSX.Element[] = [];

    // Use the value's date as base instead of today
    const baseDate = (value ? dayjs(value) : dayjs()).startOf("day");

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            // Skip times after the end hour
            if (hour === endHour && minute > 0) break;

            const timeSlot = baseDate
                .hour(hour)
                .minute(minute)
                .second(0)
                .millisecond(0);

            const ampm = hour < 12 ? "am" : "pm";

            const DATA_TESTID = getOptionTestId(
                hour,
                minute,
                ampm,
                mainDataTestId
            );

            slots.push(getOption(timeSlot.toISOString(), DATA_TESTID));
        }
    }

    return slots;
};

// ------------------------------------------------------------------

const PaperSx: SxProps<Theme> = {
    width: "inherit",
    height: "300px",
    overflowY: "auto",
};

interface TimePickerProps
    extends Omit<SelectProps<string>, "value" | "defaultValue" | "onChange"> {
    value: string;
    onChange: (v: string) => void;

    minTime?: number;
    maxTime?: number;
}

const TimePicker = forwardRef<HTMLSelectElement, TimePickerProps>(
    (
        { value, minTime: _minTime, maxTime: _maxTime, onChange, ...props },
        ref
    ) => {
        const dataTestId = (props as any)?.["data-testid"];

        const renderValue = useCallback(
            () => formatTimeDisplay(value),
            [value]
        );

        const minTime = _minTime ?? DEFAULT_MIN_TIME;
        const maxTime = _maxTime ?? DEFAULT_MAX_TIME;

        const OPTIONS = useMemo(
            () => generateTimeSlots(value, dataTestId, minTime, maxTime),
            [value, minTime, maxTime, dataTestId]
        );

        const handleChange = useCallback(
            (e: SelectChangeEvent<string>) => {
                const v = e.target.value;
                onChange(v);
            },
            [onChange]
        );

        return (
            <Select
                ref={ref}
                value={value}
                renderValue={renderValue}
                onChange={handleChange}
                MenuProps={{ slotProps: { paper: { sx: PaperSx } } }}
                {...props}
            >
                {OPTIONS}
            </Select>
        );
    }
);

TimePicker.displayName = "TimePicker";

export { getOptionTestId };
export type { TimePickerProps };
export default TimePicker;
