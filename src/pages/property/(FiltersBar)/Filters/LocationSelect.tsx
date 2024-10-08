import React, { useState } from "react";
import { IconButton, TextField, InputAdornment, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";

interface LocationSelectProps {
    onLocationChange: (location: string) => void; // Callback to handle location change
}

const LocationSelect: React.FC<LocationSelectProps> = ({
    onLocationChange,
}) => {
    const { t } = useTranslation();
    const [showSearch, setShowSearch] = useState(false);
    const [location, setLocation] = useState("");
    const theme = useTheme();

    const handleSearchToggle = () => {
        setShowSearch(!showSearch);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        onLocationChange(newLocation);
    };

    return (
        <Grid container alignItems="center">
            <Grid item xs={12}>
                <TextField
                    label={showSearch ? t("Search Location") : ""}
                    value={location}
                    onChange={handleLocationChange}
                    sx={{
                        width: showSearch ? "160px" : "50px",
                        transition: "width 0.3s",
                        "& .MuiOutlinedInput-root": {
                            padding: "0px",
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
                            borderWidth: showSearch ? "1px" : "0px", // Control border visibility
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
                                <IconButton onClick={handleSearchToggle}>
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
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default LocationSelect;
