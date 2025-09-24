import Select, { SelectProps } from "@/components/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface YearSelectProps extends Omit<SelectProps<number>, "label"> {}

const YearSelect: FC<YearSelectProps> = (props) => {
    const { t } = useTranslation();

    const yearOptions = useMemo(() => {
        const options = [];
        const startYear = 1960;
        const endYear = props.value;
        for (let year = startYear; year <= (endYear as number); year++) {
            options.push(year);
        }
        return options;
    }, [props.value]);

    return (
        <Select label={t("Year")} {...props}>
            {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            ))}
        </Select>
    );
};

export default YearSelect;
