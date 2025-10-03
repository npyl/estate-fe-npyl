import { forwardRef, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import StyledTextField, { StyledSearchProps } from "./StyledTextField";
import { ClickAwayListener } from "@mui/material";
import AdornmentLeft from "./AdornmentLeft";
import AdornmentRight from "./AdornmentRight";

// --------------------------------------------------------------------

interface PoppingSearchProps
    extends Omit<StyledSearchProps, "open" | "onClick"> {
    onClear: VoidFunction;
}

const PoppingSearch = forwardRef<HTMLDivElement, PoppingSearchProps>(
    ({ onClear, InputProps, label: _label, ...props }, ref) => {
        const [isOpen, openSearch, closeSearch] = useDialog();

        const label = isOpen ? _label : "";

        return (
            <ClickAwayListener onClickAway={closeSearch}>
                <StyledTextField
                    ref={ref}
                    open={isOpen}
                    label={label}
                    InputProps={{
                        ...InputProps,
                        startAdornment: <AdornmentLeft />,
                        endAdornment: isOpen ? (
                            <AdornmentRight
                                onClear={onClear}
                                onClose={closeSearch}
                            />
                        ) : null,
                    }}
                    onClick={openSearch}
                    {...props}
                />
            </ClickAwayListener>
        );
    }
);

PoppingSearch.displayName = "PoppingSearch";

export default PoppingSearch;
