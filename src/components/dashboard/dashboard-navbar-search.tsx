import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchCustomerQuery } from "src/services/customers";
import { useSearchPropertyQuery } from "src/services/properties";
import { useDebouncedCallback } from "use-debounce";
import { SearchList } from "./components/SearchList";
import { SearchInput } from "./styles";

type SearchCategory = "all" | "properties" | "customers";

export const DashboardNavbarSearch: FC = () => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState("");
    const [debouncedText, setDebouncedText] = useState("");
    const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");
    const [anchorEl, setAnchorEl] = useState(null);

    const { data: propertiesResults } = useSearchPropertyQuery(
        { searchString: debouncedText, page: 0, pageSize: 5 },
        {
            skip: debouncedText === "",
        }
    );
    const { data: customersResults } = useSearchCustomerQuery(debouncedText, {
        skip: debouncedText === "",
    });

    const handleSearch = useDebouncedCallback((value) => {
        if (searchText != "") setDebouncedText(value);
    }, 50);

    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
        setAnchorEl(event.currentTarget);
        handleSearch(event.target.value);
    };

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const properties = useMemo(
        () =>
            searchCategory !== "customers"
                ? propertiesResults?.content || []
                : [],
        [searchCategory, propertiesResults]
    );
    const customers = useMemo(
        () => (searchCategory !== "properties" ? customersResults || [] : []),
        [searchCategory, customersResults]
    );

    return (
        <div>
            <SearchInput
                value={searchText}
                onChange={handleInputChange}
                placeholder={t("Search") || ""}
                sx={{
                    input: {
                        paddingLeft: "30px", // adjust this as needed
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
                        onClick={handleSearch}
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
                            onChange={(event) =>
                                setSearchCategory(
                                    event.target.value as SearchCategory
                                )
                            }
                        >
                            <MenuItem value="all">{t("All")}</MenuItem>
                            <MenuItem value="properties">
                                {t("Properties")}
                            </MenuItem>
                            <MenuItem value="customers">
                                {t("Customers")}
                            </MenuItem>
                        </Select>
                    </InputAdornment>
                }
            />

            <SearchList
                open={open}
                anchorEl={anchorEl}
                properties={properties}
                customers={customers}
                searchText={searchText}
                onClickOutside={() => setAnchorEl(null)}
            />
        </div>
    );
};
