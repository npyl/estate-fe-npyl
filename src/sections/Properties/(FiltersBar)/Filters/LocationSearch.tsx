import React, { useState } from "react";
import { IconButton, TextField, InputAdornment, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "src/store";
import {
    setLocationSearch,
    resetLocationSearch,
    selectLocationSearch,
} from "@/slices/filters";
import { useDebouncedCallback } from "use-debounce";
import useToggle from "@/hooks/useToggle";

const LocationSearch = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedLocation = useSelector(selectLocationSearch);
    const [inputValue, setInputValue] = useState(selectedLocation || "");
    const [showSearch, handleSearchToggle] = useToggle(false);
    const theme = useTheme();

    const debouncedOnLocationChange = useDebouncedCallback(
        (location: string) => {
            dispatch(setLocationSearch(location));
        },
        300
    );

    // Handle input changes for location
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const location = e.target.value;

        if (location.trim() === "") {
            setInputValue("");
            dispatch(resetLocationSearch());
        } else {
            setInputValue(location);
            debouncedOnLocationChange(location);
        }
    };

    const handleClearLocation = () => {
        setInputValue("");
        dispatch(resetLocationSearch());
        handleSearchToggle();
    };

    return (
        <Grid container alignItems="center">
            <Grid item xs={12}>
                <TextField
                    label={showSearch ? t("Search Location") : ""}
                    value={inputValue}
                    onChange={handleLocationChange}
                    sx={{
                        width: showSearch ? "200px" : "40px",
                        transition: "width 0.3s",
                        "& .MuiOutlinedInput-root": {
                            padding: "0px 4px",
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: theme.palette.primary.main, // Only show border when focused
                            },
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: showSearch
                                ? theme.palette.mode === "dark"
                                    ? "#888"
                                    : "#ccc"
                                : "none", // No border when not focused and showSearch is false
                            borderWidth: showSearch ? "1px" : "0px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: showSearch
                                ? theme.palette.mode === "dark"
                                    ? "#888"
                                    : "#ccc"
                                : "none", // No hover effect if showSearch is false
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton
                                    onClick={handleSearchToggle}
                                    sx={{
                                        paddingLeft: "2px",
                                        ":hover": {
                                            backgroundColor: showSearch
                                                ? "transparent"
                                                : "",
                                        },
                                    }}
                                >
                                    <SearchIcon
                                        sx={{
                                            color:
                                                theme.palette.mode === "dark"
                                                    ? "#888"
                                                    : "#555",
                                        }}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                        // Show the clear icon when there is input text and showSearch is true
                        endAdornment: inputValue && showSearch && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClearLocation}
                                    sx={{
                                        padding: "2px",
                                        ":hover": {
                                            backgroundColor: "transparent",
                                        },
                                    }}
                                >
                                    <ClearIcon
                                        sx={{
                                            color:
                                                theme.palette.mode === "dark"
                                                    ? "#888"
                                                    : "#555",
                                        }}
                                    />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default LocationSearch;
