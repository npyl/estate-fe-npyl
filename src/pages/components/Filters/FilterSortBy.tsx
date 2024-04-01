import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface IFilterSortByProps {
    onSorting: (sortingBy: string, sortingOrder: string) => void;
}

export default function FilterSortBy({ onSorting }: IFilterSortByProps) {
    const { t } = useTranslation();
    const sortByFilterOptions = [
        { value: "default", label: t("Default Sorting") },
        {
            value: "Ascending_Price",
            label: t("Rising Price"),
        },
        {
            value: "Descending_Price",
            label: t("Falling Price"),
        },
        {
            value: "Ascending_Area",
            label: t("Rising Area"),
        },
        {
            value: "Descending_Area",
            label: t("Falling Area"),
        },
    ];

    const [selectedOption, setSelectedOption] = useState<string>("default");

    return (
        <FormControl
            variant="standard"
            sx={{
                minWidth: "130px",
                minHeight: "38px",
            }}
        >
            <Select
                disableUnderline
                labelId="demo-simple-select-label"
                id="demo-simple-select-standard"
                value={selectedOption}
                sx={{
                    "&.Mui-focusVisible": {
                        background: "transparent",
                    },
                }}
                onChange={(e) => {
                    setSelectedOption(e.target.value || "");

                    if (e.target.value === sortByFilterOptions[0].value) {
                        onSorting("", "");
                    } else if (
                        e.target.value === sortByFilterOptions[1].value
                    ) {
                        onSorting(t("price"), "asc");
                    } else if (
                        e.target.value === sortByFilterOptions[2].value
                    ) {
                        onSorting(t("price"), "desc");
                    } else if (
                        e.target.value === sortByFilterOptions[3].value
                    ) {
                        onSorting(t("area"), "asc");
                    } else if (
                        e.target.value === sortByFilterOptions[4].value
                    ) {
                        onSorting(t("price"), "desc");
                    }
                }}
            >
                {sortByFilterOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
