import Select, { SelectProps } from "@/components/Select";
import MenuItem from "@mui/material/MenuItem";
import { FC } from "react";
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

interface MonthSelectProps extends Omit<SelectProps<number>, "label"> {}

const MonthSelect: FC<MonthSelectProps> = (props) => {
    const { t } = useTranslation();
    return (
        <Select label={t("Month")} {...props}>
            {months.map((month, index) => (
                <MenuItem key={month} value={index}>
                    {month}
                </MenuItem>
            ))}
        </Select>
    );
};

export default MonthSelect;
