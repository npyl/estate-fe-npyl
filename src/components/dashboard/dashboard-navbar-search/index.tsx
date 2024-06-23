import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchList } from "./SearchList";
import SearchInput from "@/components/SearchInput";
import { SearchCategory } from "./types";

export const DashboardNavbarSearch: FC = () => {
    const { t } = useTranslation();

    const [searchText, setSearchText] = useState("");

    const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
        setAnchorEl(event.currentTarget);
    };

    const handleChangeCategory = (event: any) => {
        setSearchCategory(event.target.value as SearchCategory);
        setSearchText("");
    };

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    return (
        <>
            <SearchInput
                value={searchText}
                onChange={handleInputChange}
                placeholder={t("Search") || ""}
                sx={{
                    input: {
                        paddingLeft: "15px", // adjust this as needed
                    },
                    "input::placeholder": {
                        textIndent: "0px", // adjust this as needed
                    },

                    width: { xs: "65vw", sm: "40vw" },
                }}
                startAdornment={
                    <IconButton
                        disabled
                        sx={{
                            borderRight: "1px solid",
                            borderColor: "divider",
                            borderRadius: 0,
                            marginLeft: "-10px",
                        }}
                        color={"primary"}
                        disableFocusRipple
                        disableRipple
                    >
                        <SearchIcon />
                    </IconButton>
                }
                endAdornment={
                    <InputAdornment
                        sx={{
                            paddingLeft: "100px",
                            display: { xs: "none", md: "flex" },
                        }}
                        position="end"
                    >
                        <Select
                            sx={{
                                borderLeft: "1px solid",
                                borderColor: "divider",
                                borderRadius: 0,
                                width: "150px",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: 0,
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                            }}
                            value={searchCategory}
                            onChange={handleChangeCategory}
                        >
                            <MenuItem value="all">{t("All")}</MenuItem>
                            <MenuItem value="properties">
                                {t("Properties")}
                            </MenuItem>
                            <MenuItem value="customers">
                                {t("Customers")}
                            </MenuItem>
                            <MenuItem value="locations">
                                {t("Locations")}
                            </MenuItem>
                        </Select>
                    </InputAdornment>
                }
            />

            {open ? (
                <SearchList
                    open={open}
                    anchorEl={anchorEl}
                    searchText={searchText}
                    searchCategory={searchCategory}
                    onClickOutside={() => setAnchorEl(null)}
                />
            ) : null}
        </>
    );
};
