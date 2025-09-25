import Select, { SelectChangeEvent, SelectProps } from "@/components/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TMode } from "./types";

interface YearSelectProps
    extends Omit<SelectProps<number>, "label" | "onChange"> {
    onChange: (value: Date | number | string, mode?: TMode) => void;
}

const YearSelect: FC<YearSelectProps> = ({ onChange: _onChange, ...props }) => {
    const { t } = useTranslation();

    const yearOptions = useMemo(() => {
        const options = [];
        const startYear = 1960;
        const endYear = new Date().getFullYear();
        for (let year = startYear; year <= endYear; year++) {
            options.push(year);
        }
        return options;
    }, []);

    const onChange = useCallback((event: SelectChangeEvent<number>) => {
        const selectedYear = event.target.value as number;
        _onChange(selectedYear, "setYear");
    }, []);

    return (
        <Select label={t("Year")} onChange={onChange} {...props}>
            {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            ))}
        </Select>
    );
};

export default YearSelect;
