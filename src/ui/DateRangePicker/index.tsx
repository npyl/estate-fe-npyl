import { useTranslation } from "react-i18next";
import { FC, useCallback, useMemo } from "react";
import Content, { ContentProps } from "./Content";
import Select from "@/components/Select";

interface DateRangePickerProps extends ContentProps {}

const DateRangePicker: FC<DateRangePickerProps> = (props) => {
    const { t } = useTranslation();

    const value = useMemo(() => {
        if (!props.startDate || !props.endDate) return "";

        const fromDateObj = props.startDate
            ? new Date(props.startDate)
            : new Date();
        const toDateObj = props.endDate ? new Date(props.endDate) : new Date();

        const fromDateStr = fromDateObj.toLocaleDateString();
        const toDateStr = toDateObj.toLocaleDateString();

        return `${fromDateStr} - ${toDateStr}`;
    }, [props.startDate, props.endDate]);
    const renderValue = useCallback(() => value, [value]);

    return (
        <Select
            label={t("Date Range")}
            value={value}
            renderValue={renderValue}
            sx={{ width: "240px" }}
            MenuProps={{
                slotProps: {
                    root: {
                        sx: {
                            top: 0,
                        },
                    },
                },
            }}
        >
            <Content {...props} />
        </Select>
    );
};

export default DateRangePicker;
