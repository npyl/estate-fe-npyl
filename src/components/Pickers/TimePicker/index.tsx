import { forwardRef, useCallback, useMemo } from "react";
import { TimeField, TimeFieldProps } from "@mui/x-date-pickers";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import dayjs, { Dayjs } from "dayjs";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Box from "@mui/material/Box";
import { DEFAULT_MAX_TIME, DEFAULT_MIN_TIME } from "./constants";
import useForwardedLocalRef from "@/hooks/useForwadedLocalRef";
const Menu = dynamic(() => import("./Menu"));

interface TimePickerProps
    extends Omit<
        TimeFieldProps<Dayjs>,
        "value" | "onChange" | "minTime" | "maxTime"
    > {
    value: string;
    onChange: (v: string) => void;

    minTime?: number;
    maxTime?: number;
}

const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
    (
        {
            value: _value,
            minTime: _minTime,
            maxTime: _maxTime,
            onChange,
            ...props
        },
        ref
    ) => {
        const value = useMemo(() => dayjs(_value), [_value]);

        const minTime = useMemo(
            () =>
                dayjs()
                    .hour(_minTime ?? DEFAULT_MIN_TIME)
                    .minute(0)
                    .second(0),
            [_minTime]
        );
        const maxTime = useMemo(
            () =>
                dayjs()
                    .hour(_maxTime ?? DEFAULT_MAX_TIME)
                    .minute(0)
                    .second(0),
            [_maxTime]
        );

        const [isOpen, openMenu, closeMenu] = useDialog();

        const anchorRef = useForwardedLocalRef<HTMLDivElement>(ref as any);

        const handleSelect = useCallback(
            (d: string) => {
                onChange(d);
                closeMenu();
            },
            [onChange]
        );

        const handleChange = useCallback(
            (d: Dayjs | null) => {
                if (!d) return;
                onChange(d.toISOString());
                closeMenu();
            },
            [onChange]
        );

        return (
            <ClickAwayListener onClickAway={closeMenu}>
                <Box>
                    <TimeField
                        ref={anchorRef}
                        value={value}
                        minTime={minTime}
                        maxTime={maxTime}
                        onChange={handleChange}
                        onClick={openMenu}
                        {...props}
                    />

                    {isOpen && anchorRef.current ? (
                        <Menu
                            minTime={_minTime}
                            maxTime={_maxTime}
                            anchorEl={anchorRef.current}
                            onSelect={handleSelect}
                        />
                    ) : null}
                </Box>
            </ClickAwayListener>
        );
    }
);

TimePicker.displayName = "TimePicker";

export type { TimePickerProps };
export default TimePicker;
