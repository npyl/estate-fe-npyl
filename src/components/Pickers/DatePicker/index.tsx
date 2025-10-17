import {
    DatePickerProps as MuiDatePickerProps,
    DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { forwardRef, useCallback, useMemo } from "react";
import { LOCAL_DATE_FORMAT } from "@/constants/datepicker";

// INFO: value prop must be LocalDate (YYYY-MM-DD)

// --------------------------------------------------------------------------

const getSlotProps = (
    slotProps: MuiDatePickerProps<dayjs.Dayjs>["slotProps"],
    dataTestId?: string
) => ({
    ...slotProps,
    textField: {
        ...slotProps?.textField,
        ...(dataTestId
            ? {
                  inputProps: {
                      "data-testid": dataTestId,
                  },
              }
            : {}),
    },
});

// --------------------------------------------------------------------------

type OmitList = "value" | "defaultValue" | "onChange";

interface DatePickerProps
    extends Omit<MuiDatePickerProps<dayjs.Dayjs>, OmitList> {
    localDate?: boolean; // INFO: toggles localDate mode ON/OFF which is the default for 99% cases of PropertyPro (and BE)

    value?: string;
    onChange?: (v: string) => void;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
    (
        {
            localDate = true,
            // ...
            value: _value,
            slotProps,
            // ...
            onChange: _onChange,
            // ...
            ...props
        },
        ref
    ) => {
        const dataTestId = (props as any)?.["data-testid"];

        const value = useMemo(() => {
            const format = localDate ? LOCAL_DATE_FORMAT : undefined;
            return _value ? dayjs(_value, format) : null;
        }, [_value, localDate]);

        const onChange = useCallback(
            (v: dayjs.Dayjs | null) => {
                if (!v) return;
                if (!_onChange) return;

                const final = localDate
                    ? v.format(LOCAL_DATE_FORMAT)
                    : v.toISOString();

                _onChange?.(final);
            },
            [localDate, _onChange]
        );

        return (
            <MuiDatePicker
                ref={ref}
                value={value}
                onChange={onChange}
                slotProps={getSlotProps(slotProps, dataTestId)}
                {...props}
            />
        );
    }
);

DatePicker.displayName = "DatePicker";

export type { DatePickerProps };
export default DatePicker;
