import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

interface MonthSelectProps
    extends Omit<SelectProps<number>, "label" | "onChange"> {
    onChange: (
        value: Date | number | string,
        mode?: "set" | "setYear" | "setMonth" | "monthOffset"
    ) => void;
}

const MonthSelect: FC<MonthSelectProps> = ({
    onChange: _onChange,
    ...props
}) => {
    const { t } = useTranslation();
    const onChange = useCallback((event: SelectChangeEvent<number>) => {
        const selectedMonth = event.target.value as number;
        _onChange(selectedMonth, "setMonth");
    }, []);
    return (
        <Select label={t("Month")} onChange={onChange} {...props}>
            {months.map((month, index) => (
                <MenuItem key={month} value={index}>
                    {month}
                </MenuItem>
            ))}
        </Select>
    );
};

export default MonthSelect;
