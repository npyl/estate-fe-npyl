// @mui
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Search = () => {
    const { t } = useTranslation();

    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(event.target.value.toLowerCase());

    return (
        <TextField
            placeholder={t("Search") || ""}
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 200 }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default Search;
