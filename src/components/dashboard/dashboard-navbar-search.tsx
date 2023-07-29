import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useSearchPropertyQuery } from "src/services/properties";
import { useDebouncedCallback } from "use-debounce";
import { SearchInput } from "./styles";
import { useTranslation } from "react-i18next";
import { SearchList } from "./components/SearchList";
import { useSearchCustomerQuery } from "src/services/customers";

export const DashboardNavbarSearch: FC = () => {
    const { t } = useTranslation();

    const [searchText, setSearchText] = useState("");
    const [debouncedText, setDebouncedText] = useState("");
    const [searchCategory, setSearchCategory] = useState<string>("all");
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
        setDebouncedText(value);
    }, 50);

    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
        setAnchorEl(event.currentTarget);
        handleSearch(event.target.value);
    };

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
    const properties = useMemo(
        () =>
            searchCategory !== "customer"
                ? propertiesResults?.content || []
                : [],
        [searchCategory, propertiesResults]
    );
    const customers = useMemo(
        () => (searchCategory !== "property" ? customersResults || [] : []),
        [searchCategory, customersResults]
    );

    return (
        <div>
            <SearchInput
                value={searchText}
                onChange={handleInputChange}
                placeholder="Search with a keyword"
                endAdornment={
                    <InputAdornment
                        sx={{ display: { xs: "none", md: "flex" } }}
                        position="end"
                    >
                        <IconButton
                            sx={{
                                borderRight: "1px solid",
                                borderColor: "divider",
                                borderRadius: 0,
                            }}
                            color={"primary"}
                            disableFocusRipple
                            disableRipple
                            onClick={handleSearch}
                        >
                            <SearchIcon />
                        </IconButton>

                        <Select
                            sx={{
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
                                setSearchCategory(event.target.value)
                            }
                        >
                            <MenuItem value="all">{t("All")}</MenuItem>
                            <MenuItem value="property">
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
