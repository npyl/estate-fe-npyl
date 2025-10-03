import { forwardRef, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import StyledTextField, { StyledSearchProps } from "./StyledTextField";
import { ClickAwayListener } from "@mui/material";
import AdornmentLeft from "./AdornmentLeft";
import AdornmentRight from "./AdornmentRight";

// --------------------------------------------------------------------

interface PoppingSearchProps extends Omit<StyledSearchProps, "open"> {
    onClear: VoidFunction;
}

const PoppingSearch = forwardRef<HTMLDivElement, PoppingSearchProps>(
    ({ onClear, InputProps, label: _label, ...props }, ref) => {
        const [isOpen, openSearch, closeSearch] = useDialog();

        const label = isOpen ? _label : "";

        const handleClear = useCallback(() => {
            onClear();
            closeSearch();
        }, [onClear]);

        return (
            <ClickAwayListener onClickAway={closeSearch}>
                <StyledTextField
                    ref={ref}
                    open={isOpen}
                    label={label}
                    InputProps={{
                        ...InputProps,
                        startAdornment: <AdornmentLeft onClick={openSearch} />,
                        endAdornment: isOpen ? (
                            <AdornmentRight onClick={handleClear} />
                        ) : null,
                    }}
                    {...props}
                />
            </ClickAwayListener>
        );
    }
);

PoppingSearch.displayName = "PoppingSearch";

export default PoppingSearch;
