import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
    ClickAwayListener,
    Paper,
    Popper,
    Stack,
    StackProps,
    Typography,
} from "@mui/material";
import { MouseEvent, useCallback, useMemo, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import { ListItem } from "@/components/Filters";
import { useSortingOptions } from "./constants";

interface StyledStackProps extends StackProps {
    open: boolean;
}

const StyledStack = styled(Stack)<StyledStackProps>(({ theme, open }) => ({
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // ...
    height: "38px",
    minWidth: "38px",
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    // ...
    color:
        theme.palette.mode === "dark"
            ? theme.palette.neutral?.[400]
            : theme.palette.text.secondary,
    border: "1px solid",
    borderRadius: "10px",
    borderColor: open ? theme.palette.primary.main : getBorderColor2(theme),
    cursor: "pointer",
    // ...
    "&:hover": {
        ...(open
            ? {
                  borderColor: theme.palette.primary.main,
              }
            : {
                  borderColor:
                      theme.palette.mode === "light"
                          ? "black"
                          : theme.palette.neutral?.[500],
              }),
    },

    ...(open
        ? {
              borderWidth: "2px",
          }
        : {}),
}));

interface SelectPopperProps {
    anchorEl?: HTMLElement;
    sorting: string;
    onSortingChange: (s: string) => void;
}

const SelectPopper = ({
    anchorEl,
    sorting,
    onSortingChange,
}: SelectPopperProps) => {
    const options = useSortingOptions();

    return (
        <Popper open={true} anchorEl={anchorEl}>
            <Paper
                sx={{
                    p: 1,
                }}
            >
                {options.map(({ label, value }, i) => (
                    <ListItem
                        key={i}
                        selected={value === sorting}
                        onClick={() => onSortingChange(value)}
                    >
                        {label}
                    </ListItem>
                ))}
            </Paper>
        </Popper>
    );
};

interface FilterSortByProps {
    sorting: string;
    onSortingChange: (s: string) => void;
}

const FilterSortBy = ({ sorting, onSortingChange }: FilterSortByProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();
    const openPopper = useCallback((e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    }, []);
    const closePopper = useCallback(() => setAnchorEl(undefined), []);
    const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

    const belowMd = useResponsive("down", "md");

    const options = useSortingOptions();
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
                        sorting={sorting}
                        onSortingChange={onSortingChange}
                    />
                ) : null}
            </div>
        </ClickAwayListener>
    );
};

export default FilterSortBy;
