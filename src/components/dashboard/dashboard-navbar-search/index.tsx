import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchList } from "./SearchList";
import { SearchInput } from "./styles";
import { SearchCategory } from "./types";
import { useDebounce } from "use-debounce";
import { useMediaQuery, useTheme } from "@mui/material";

export const DashboardNavbarSearch: FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch] = useDebounce(searchText, 300);

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
                            // paddingLeft: "100px",
                            display: { xs: "flex", md: "flex" },
                        }}
                        position="end"
                    >
                        <Select
                            sx={{
                                borderLeft: "1px solid",
                                borderColor: "divider",
                                borderRadius: 0,
                                width: isMobile ? "85px" : "150px",
                                ".MuiOutlinedInput-notchedOutline": {
                                    border: 0,
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        border: 0,
                                    },
                                alignItems: "center",
                            }}
                            value={searchCategory}
                            onChange={handleChangeCategory}
                        >
                            <MenuItem value="all">{t("All")}</MenuItem>
                            <MenuItem value="properties">
                                {isMobile ? (
                                    <HomeOutlinedIcon sx={{ mt: 1 }} />
                                ) : (
                                    t("Properties")
                                )}
                            </MenuItem>
                            <MenuItem value="customers">
                                {isMobile ? (
                                    <PersonOutlineOutlinedIcon sx={{ mt: 1 }} />
                                ) : (
                                    t("Customers")
                                )}
                            </MenuItem>
                        </Select>
                    </InputAdornment>
                }
            />

            {open ? (
                <SearchList
                    open={open}
                    anchorEl={anchorEl}
                    searchText={debouncedSearch}
                    searchCategory={searchCategory}
                    onClickOutside={() => setAnchorEl(null)}
                />
            ) : null}
        </>
    );
};
