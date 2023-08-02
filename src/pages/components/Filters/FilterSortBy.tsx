import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

interface IFilterSortByProps {
    onSorting: (sortingBy: string, sortingOrder: string) => void;
}

export default function FilterSortBy({ onSorting }: IFilterSortByProps) {
    const sortByFilterOptions = [
        { value: "default", label: "Deafult Sorting" },
        {
            value: "Ascending_Price",
            label: "Rising Price ",
        },
        {
            value: "Descending_Price",
            label: "Falling Price ",
        },
        {
            value: "Ascending_Area",
            label: "Rsing Area",
        },
        {
            value: "Descending_Area",
            label: "Falling Price",
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
                        onSorting("price", "asc");
                    } else if (
                        e.target.value === sortByFilterOptions[2].value
                    ) {
                        onSorting("price", "desc");
                    } else if (
                        e.target.value === sortByFilterOptions[3].value
                    ) {
                        onSorting("area", "asc");
                    } else if (
                        e.target.value === sortByFilterOptions[4].value
                    ) {
                        onSorting("price", "desc");
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
