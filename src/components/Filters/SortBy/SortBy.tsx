import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Typography } from "@mui/material";
import { FC, useMemo, useRef } from "react";
import useResponsive from "@/hooks/useResponsive";
import StyledStack from "./styled";
import SelectPopover from "./popover";
import { TSortByOptions } from "./types";
import useDialog from "@/hooks/useDialog";

interface FilterSortByProps {
    options: TSortByOptions;
    sorting: string;
    onSortingChange: (s: string) => void;
}

const FilterSortBy: FC<FilterSortByProps> = ({
    options,
    sorting,
    onSortingChange,
}) => {
    const anchorRef = useRef<HTMLDivElement>(null);

    const [isOpen, openPopover, closePopover] = useDialog();

    const belowMd = useResponsive("down", "md");

    const label = useMemo(
        () => options.find(({ value }) => value === sorting)?.label || "",
        [options, sorting]
    );

    return (
        <>
            <StyledStack
                ref={anchorRef}
                open={isOpen}
                onClick={openPopover}
                mt={1}
            >
                <SwapVertIcon />

                {belowMd ? null : (
                    <Typography fontWeight={400} noWrap>
                        {label}
                    </Typography>
                )}
            </StyledStack>

            {isOpen ? (
                <SelectPopover
                    open
                    anchorEl={anchorRef.current}
                    onClose={closePopover}
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
