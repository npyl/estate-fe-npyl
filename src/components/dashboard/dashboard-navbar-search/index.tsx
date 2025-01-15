import SearchIcon from "@mui/icons-material/Search";
import {
    ClickAwayListener,
    IconButton,
    InputAdornment,
    InputBaseProps,
    SxProps,
    Theme,
} from "@mui/material";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "@/components/Search/SearchInput";
import { SearchCategory } from "./types";
import { useDebounce } from "use-debounce";
import ModeSelect from "./ModeSelect";
import dynamic from "next/dynamic";
import { addSearchHistory } from "./history";
import { HistoryListRef } from "./HistoryList";
const HistoryList = dynamic(() => import("./HistoryList"));
const SearchList = dynamic(() => import("./SearchList"));

const SearchInputSx: SxProps<Theme> = {
    input: {
        pl: { xs: 0, sm: "15px" }, // adjust this as needed
    },
    "input::placeholder": {
        textIndent: "0px", // adjust this as needed
    },
    p: { xs: 0.5, sm: 1 },
    width: { xs: "min-content", sm: "100%", lg: "40vw" },
};

const StartAdornment = () => (
    <InputAdornment position="start">
        <IconButton
            disabled
            sx={{
                borderRight: { xs: 0, sm: "1px solid" },
                borderColor: "divider",
                borderRadius: 0,
                pr: { xs: 0, sm: 1 },
            }}
            color="primary"
            disableFocusRipple
            disableRipple
        >
            <SearchIcon />
        </IconButton>
    </InputAdornment>
);

const DashboardNavbarSearch: FC<InputBaseProps> = ({ sx, ...props }) => {
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const historyRef = useRef<HistoryListRef>(null);

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch] = useDebounce(searchText, 300);
    const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
        // Set anchorEl to the parent container of the input same as the anchor element of the search history
        if (inputRef.current) {
            const closestEl = inputRef.current.closest(
                ".MuiInputBase-root"
            ) as HTMLElement | null;
            if (closestEl) {
                setAnchorEl(closestEl); // Only set if closestEl is found
            }
        }
    };

    const handleChangeCategory = (event: any) => {
        setSearchCategory(event.target.value as SearchCategory);
        setSearchText("");
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            addSearchHistory(searchText); // Add the search term to the history
        }
    };

    const handleFocus = (event: any) => {
        if (inputRef.current) {
            const closestEl = inputRef.current.closest(
                ".MuiInputBase-root"
            ) as HTMLElement | null;
            if (closestEl) {
                setAnchorEl(closestEl); // Only set if closestEl is found
            }
        }
    };

    // search history functions
    const handleSelectHistory = useCallback((searchTerm: string) => {
        setSearchText(searchTerm);
        setAnchorEl(inputRef.current);
    }, []);

    const handleUpdateSearchHistory = useCallback(
        (h: string[]) => historyRef.current?.setSearchHistory(h),
        []
    );

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    return (
        <>
            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <div style={{ position: "relative" }}>
                    <SearchInput
                        ref={inputRef}
                        value={searchText}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        placeholder={t("Search") || ""}
                        onKeyDown={handleKeyDown}
                        sx={{ ...SearchInputSx, ...sx }}
                        startAdornment={<StartAdornment />}
                        endAdornment={
                            <ModeSelect
                                value={searchCategory}
                                onChange={handleChangeCategory}
                            />
                        }
                        {...props}
                    />

                    {open && searchText.trim() === "" ? (
                        <HistoryList
                            ref={historyRef}
                            onSelect={handleSelectHistory}
                        />
                    ) : null}
                </div>
            </ClickAwayListener>

            {anchorEl !== null &&
            debouncedSearch &&
            searchText.trim() !== "" ? (
                <SearchList
                    open
                    anchorEl={anchorEl}
                    searchText={debouncedSearch}
                    searchCategory={searchCategory}
                    onClickOutside={() => setAnchorEl(null)}
                    updateSearchHistory={handleUpdateSearchHistory}
                />
            ) : null}
        </>
    );
};

export default DashboardNavbarSearch;
