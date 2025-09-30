import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { forwardRef, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import StyledTextField, { StyledSearchProps } from "./StyledTextField";

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
            <StyledTextField
                ref={ref}
                open={isOpen}
                label={label}
                InputProps={{
                    ...InputProps,
                    startAdornment: InputProps?.startAdornment || (
                        <InputAdornment position="start">
                            <IconButton onClick={openSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    endAdornment:
                        InputProps?.endAdornment || isOpen ? (
                            <InputAdornment position="end">
                                <IconButton onClick={handleClear}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                }}
                {...props}
            />
        );
    }
);

PoppingSearch.displayName = "PoppingSearch";

export default PoppingSearch;
