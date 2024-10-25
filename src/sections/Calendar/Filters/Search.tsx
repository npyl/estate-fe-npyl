import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { FC } from "react";
import useDialog from "@/hooks/useDialog";

interface StyledSearchProps extends TextFieldProps<"outlined"> {
    open?: boolean;
}

const StyledTextField = styled(TextField)<StyledSearchProps>(
    ({ open, theme }) => ({
        width: open ? "160px" : "50px",

        transition: "width 0.3s",
        "& .MuiOutlinedInput-root": {
            padding: "0px 4px",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main, // Only show border when focused
            },
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: open
                ? theme.palette.mode === "dark"
                    ? "#888"
                    : "#ccc"
                : "none", // No border when not focused and showSearch is false
            borderWidth: open ? "1px" : "0px",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: open
                ? theme.palette.mode === "dark"
                    ? "#888"
                    : "#ccc"
                : "none", // No hover effect if showSearch is false
        },
    })
);

interface PoppingSearchProps extends StyledSearchProps {
    onOpen: VoidFunction;
    onClear?: VoidFunction;
}

const PoppingSearch: FC<PoppingSearchProps> = ({
    onOpen,
    onClear,
    InputProps,
    ...props
}) => (
    <StyledTextField
        {...props}
        InputProps={{
            ...InputProps,
            startAdornment: InputProps?.startAdornment || (
                <InputAdornment position="start">
                    <IconButton onClick={onOpen}>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            ),
            endAdornment:
                InputProps?.endAdornment || (onClear && props.value) ? (
                    <InputAdornment position="end">
                        <IconButton onClick={onClear}>
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ) : null,
        }}
    />
);

// label={showSearch ? t("Search Location") : ""}
// placeholder={t("Search") || ""}
// value={inputValue}
// onChange={handleLocationChange}

const Search = () => {
    const [isOpen, openSearch, closeSearch] = useDialog();

    return (
        <PoppingSearch
            open={isOpen}
            onOpen={openSearch}
            onClear={closeSearch}
            variant="outlined"
        />
    );
};

export default Search;
