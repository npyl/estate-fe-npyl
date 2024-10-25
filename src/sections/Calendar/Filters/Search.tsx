import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { ChangeEvent, FC, useState } from "react";
import useDialog from "@/hooks/useDialog";
import { useDebounce } from "use-debounce";

// --------------------------------------------------------------------------

interface StyledSearchProps extends TextFieldProps<"outlined"> {
    open?: boolean;
}

const StyledTextField = styled(TextField)<StyledSearchProps>(({ open }) => ({
    minWidth: "50px",
    width: open ? "160px" : "50px",
    transition: "width 0.3s",
}));

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
                InputProps?.endAdornment || (onClear && props.open) ? (
                    <InputAdornment position="end">
                        <IconButton onClick={onClear}>
                            <ClearIcon />
                        </IconButton>
                    </InputAdornment>
                ) : null,
        }}
    />
);

// --------------------------------------------------------------------------

const Search = () => {
    const [isOpen, openSearch, closeSearch] = useDialog();

    const [search, setSearch] = useState("");
    const [debounced] = useDebounce(search, 500);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value);

    const handleClear = () => {
        setSearch("");
        closeSearch();
    };

    return (
        <PoppingSearch
            open={isOpen}
            onOpen={openSearch}
            onClear={handleClear}
            variant="outlined"
            // ...
            value={search}
            onChange={handleSearch}
        />
    );
};

export default Search;
