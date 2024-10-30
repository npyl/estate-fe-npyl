import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { FC, useCallback, useMemo } from "react";
import { Props } from "./types";

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

const MonthSelect: FC<Props> = ({ date, onDateChange }) => {
    const { i18n } = useTranslation();
    const locale = i18n.language === "en" ? "en-US" : "el-GR";
    const OPTIONS = useMemo(() => getOPTIONS(locale), [locale]);

    const handleChange = useCallback(
        (e: SelectChangeEvent<number>) => {
            const newDate = new Date(date);
            newDate.setMonth(+e.target.value!);
            onDateChange(newDate);
        },
        [date, onDateChange]
    );

    return (
        // <FormControl size="small">
        <Select value={date.getMonth()} onChange={handleChange}>
            {OPTIONS.map(getOption)}
        </Select>
        // </FormControl>
    );
};

export default MonthSelect;
