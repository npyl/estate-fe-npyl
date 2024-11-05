import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { forwardRef, useCallback } from "react";
import useDialog from "@/hooks/useDialog";

// --------------------------------------------------------------------

interface StyledSearchProps
    extends Omit<TextFieldProps<"outlined">, "variant"> {
    open: boolean;
}

const StyledTextField = styled(TextField)<StyledSearchProps>(({ open }) => ({
    minWidth: open ? "160px" : "50px",
    width: open ? "160px" : "50px",
    transition: "all 0.3s",
}));

// --------------------------------------------------------------------

interface PoppingSearchProps extends Omit<StyledSearchProps, "open"> {
    onClear: VoidFunction;
}

const PoppingSearch = forwardRef<HTMLDivElement, PoppingSearchProps>(
    ({ onClear, InputProps, ...props }, ref) => {
        const [isOpen, openSearch, closeSearch] = useDialog();

        const handleClear = useCallback(() => {
            onClear();
            closeSearch();
        }, [onClear]);

        return (
            <StyledTextField
                ref={ref}
                open={isOpen}
                {...props}
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
            />
        );
    }
);

export default PoppingSearch;
