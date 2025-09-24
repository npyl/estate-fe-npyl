import { FC, useCallback, useMemo } from "react";
import { TSortByOption, TSortByOptions } from "./types";
import Select, { SelectProps } from "@/components/Select";
import {
    InputAdornment,
    MenuItem,
    SelectChangeEvent,
    SxProps,
    Theme,
} from "@mui/material";
import Iconify from "@/components/iconify";
import SwapVertIcon from "@mui/icons-material/SwapVert";

// -----------------------------------------------------------------------------

const MenuItemSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    gap: 1,
};

const IconSx: SxProps<Theme> = {
    color: ({ palette: { mode, neutral, text } }) =>
        mode === "dark" ? neutral?.[400] : text.secondary,
};

const getOption =
    (sorting: string) =>
    ({ value, icon, label }: TSortByOption) => (
        <MenuItem
            key={value}
            value={value}
            selected={value === sorting}
            sx={MenuItemSx}
        >
            {icon ? <Iconify icon={icon} sx={IconSx} /> : null}
            {label}
        </MenuItem>
    );

// -----------------------------------------------------------------------------

interface FilterSortByProps
    extends Omit<
        SelectProps<string>,
        "label" | "value" | "onChange" | "startAdornment" | "renderValue"
    > {
    options: TSortByOptions;
    sorting: string;
    onSortingChange: (s: string) => void;
}

const FilterSortBy: FC<FilterSortByProps> = ({
    options,
    sorting,
    onSortingChange,
    ...props
}) => {
    const value = useMemo(
        () => options.find(({ value }) => value === sorting)?.label || "",
        [options, sorting]
    );
    const renderValue = useCallback(() => value, [value]);

    const onChange = useCallback(
        (e: SelectChangeEvent) => onSortingChange(e.target.value),
        [onSortingChange]
    );

    return (
        <Select
            value={sorting}
            onChange={onChange}
            renderValue={renderValue}
            startAdornment={
                <InputAdornment position="start">
                    <SwapVertIcon />
                </InputAdornment>
            }
            {...props}
        >
            {options.map(getOption(sorting))}
        </Select>
    );
};

export default FilterSortBy;
