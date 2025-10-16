import {
    DatePickerProps as MuiDatePickerProps,
    DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, useCallback, useMemo } from "react";
import { LOCAL_DATE_FORMAT } from "@/constants/datepicker";
import toLocalDate from "@/utils/toLocalDate";

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

interface DatePickerProps
    extends Omit<MuiDatePickerProps<dayjs.Dayjs>, "value" | "onChange"> {
    value?: string;
    onChange?: (v: string) => void;
    onChangeISO?: (v: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({
    value: _value,
    slotProps,
    // ...
    onChange: _onChange,
    onChangeISO,
    // ...
    ...props
}) => {
    const dataTestId = (props as any)?.["data-testid"];

    const value = useMemo(
        () => (_value ? dayjs(_value, LOCAL_DATE_FORMAT) : null),
        [_value]
    );

    const onChange = useCallback(
        (v: dayjs.Dayjs | null) => {
            _onChange?.(toLocalDate(v?.toISOString() || ""));
            onChangeISO?.(v?.toISOString() || "");
        },
        [_onChange, onChangeISO]
    );

    return (
        <MuiDatePicker
            value={value}
            onChange={onChange}
            slotProps={getSlotProps(slotProps, dataTestId)}
            {...props}
        />
    );
};

export type { DatePickerProps };
export default DatePicker;
