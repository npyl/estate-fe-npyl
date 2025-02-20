import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Stack, StackProps, Typography } from "@mui/material";
import { FC, useMemo, useRef } from "react";
import { TSortByOptions } from "./types";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import getStackSx from "./styled";
const SelectPopover = dynamic(() => import("./popover"));

interface FilterSortByProps extends StackProps {
    options: TSortByOptions;
    sorting: string;
    onSortingChange: (s: string) => void;
}

const FilterSortBy: FC<FilterSortByProps> = ({
    options,
    sorting,
    onSortingChange,
    sx,
    ...props
}) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    const label = useMemo(
        () => options.find(({ value }) => value === sorting)?.label || "",
        [options, sorting]
    );

    return (
        <>
            <Stack
                ref={anchorRef}
                onClick={openPopover}
                sx={{ ...getStackSx(isOpen), ...sx } as any}
                {...props}
            >
                <SwapVertIcon />

                <Typography
                    className="PPSortByButton-Label"
                    fontWeight={400}
                    noWrap
                >
                    {label}
                </Typography>
            </Stack>

            {isOpen ? (
                <SelectPopover
                    open
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
                    disableScrollLock
                    // ...
                    options={options}
                    sorting={sorting}
                    onSortingChange={onSortingChange}
                />
            ) : null}
        </>
    );
};

export default FilterSortBy;
