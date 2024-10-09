import React, { useCallback, useState, useEffect } from "react";
import {
    IconButton,
    TextField,
    InputAdornment,
    Grid,
    debounce,
} from "@mui/material";
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

const LocationSearch = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedLocation = useSelector(selectLocationSearch);
    const [inputValue, setInputValue] = useState(selectedLocation || "");
    const [showSearch, setShowSearch] = useState(false);
    const theme = useTheme();

    const handleSearchToggle = () => {
        setShowSearch(!showSearch);
    };

    const debouncedOnLocationChange = useCallback(
        debounce((location: string) => {
            if (location) {
                dispatch(setLocationSearch(location));
            }
        }, 300),
        []
    );

    useEffect(() => {
        // Update local input state when locationSearch in the store changes
        setInputValue(selectedLocation || "");
    }, [selectedLocation]);

    // Handle input changes for location
    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const location = e.target.value;
        setInputValue(location);

        if (location.trim() === "") {
            debouncedOnLocationChange.clear();
            dispatch(resetLocationSearch());
        } else {
            debouncedOnLocationChange(location);
        }
    };

    const handleClearLocation = () => {
        setInputValue("");
        dispatch(resetLocationSearch());
    };

    return (
        <Grid container alignItems="center">
            <Grid item xs={12}>
                <TextField
                    label={showSearch ? t("Search Location") : ""}
                    // placeholder={t("") || ""}
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
