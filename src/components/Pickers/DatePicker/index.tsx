import {
    DatePickerProps as MuiDatePickerProps,
    DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC, useCallback, useMemo } from "react";
import toLocalDate from "@/utils/toLocalDate";
import utc from "dayjs/plugin/utc";
import { LOCAL_DATE_FORMAT } from "@/constants/datepicker";

dayjs.extend(utc);

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
    localDate?: false; // INFO: toggles localDate mode ON/OFF which is the default for 99% cases of PropertyPro (and BE)

    value?: string;
    onChange?: (v: string) => void;
    onChangeISO?: (v: string) => void;
}

const DatePicker: FC<DatePickerProps> = ({
    localDate = true,
    // ...
    value: _value,
    slotProps,
    // ...
    onChange: _onChange,
    onChangeISO,
    // ...
    ...props
}) => {
    const dataTestId = (props as any)?.["data-testid"];

    const format = localDate ? LOCAL_DATE_FORMAT : undefined;

    const value = useMemo(
        () => (_value ? dayjs(_value, format) : null),
        [_value, format]
    );

    const onChange = useCallback(
        (v: dayjs.Dayjs | null) => {
            const utcDate = v?.utc().startOf("day");
            _onChange?.(toLocalDate(utcDate?.toISOString() || ""));
            onChangeISO?.(utcDate?.toISOString() || "");
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
