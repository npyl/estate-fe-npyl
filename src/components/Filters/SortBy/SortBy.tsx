import SwapVertIcon from "@mui/icons-material/SwapVert";
import { ClickAwayListener, Typography } from "@mui/material";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import StyledStack from "./styled";
import SelectPopper from "./popper";
import { TSortByOptions } from "./types";

interface FilterSortByProps {
    options: TSortByOptions;
    sorting: string;
    onSortingChange: (s: string) => void;
}

const FilterSortBy = ({
    options,
    sorting,
    onSortingChange,
}: FilterSortByProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const openPopper = useCallback((e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    }, []);
    const closePopper = useCallback(() => setAnchorEl(undefined), []);
    const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

    const belowMd = useResponsive("down", "md");

    const label = useMemo(
        () => options.find(({ value }) => value === sorting)?.label || "",
        [options, sorting]
    );

    return (
        <ClickAwayListener
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
            onClickAway={closePopper}
        >
            <div>
                <StyledStack open={isOpen} onClick={openPopper}>
                    <SwapVertIcon />

                    {belowMd ? null : (
                        <Typography fontWeight={400} noWrap>
                            {label}
                        </Typography>
                    )}
                </StyledStack>

                {isOpen ? (
                    <SelectPopper
                        anchorEl={anchorEl}
                        // ...
                        options={options}
                        sorting={sorting}
                        onSortingChange={onSortingChange}
                    />
                ) : null}
            </div>
        </ClickAwayListener>
    );
};

export default FilterSortBy;
