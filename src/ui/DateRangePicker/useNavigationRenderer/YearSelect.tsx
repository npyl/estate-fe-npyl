import Select, { SelectProps } from "@/components/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC, useMemo } from "react";

const YearSelect: FC<SelectProps<number>> = (props) => {
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
        <Select {...props}>
            {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            ))}
        </Select>
    );
};

export default YearSelect;
