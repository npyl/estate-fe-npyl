import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import { useTranslation } from "react-i18next";
import { FC, useCallback, useMemo } from "react";

interface Option {
    key: number;
    label: string;
}

const getOption = ({ key, label }: Option) => (
    <MenuItem key={key} value={key}>
        {label}
    </MenuItem>
);

const getOPTIONS = (locale: "en-US" | "el-GR") =>
    Array.from({ length: 12 }, (_, index) => {
        const d = new Date(2024, index, 1);
        return {
            key: d.getMonth(),
            label: d.toLocaleString(locale, { month: "long" }),
        };
    });

interface MonthSelectProps
    extends Omit<SelectProps<number>, "value" | "onChange"> {
    date: Date;
    onDateChange: (d: Date) => void;
}

const MonthSelect: FC<MonthSelectProps> = ({
    date,
    onDateChange,
    ...props
}) => {
    const { i18n } = useTranslation();
    const locale = i18n.language === "en" ? "en-US" : "el-GR";
    const OPTIONS = useMemo(() => getOPTIONS(locale), [locale]);

    const handleChange = useCallback(
        (e: SelectChangeEvent<number>) => {
            const newDate = new Date(date);
            newDate.setMonth(e.target.value as unknown as number);
            onDateChange(newDate);
        },
        [date, onDateChange]
    );

    return (
        <Select value={date.getMonth()} onChange={handleChange} {...props}>
            {OPTIONS.map(getOption)}
        </Select>
    );
};

export default MonthSelect;
