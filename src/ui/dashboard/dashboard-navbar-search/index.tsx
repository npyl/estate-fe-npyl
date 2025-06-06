import SearchIcon from "@mui/icons-material/Search";
import {
    ClickAwayListener,
    IconButton,
    InputAdornment,
    InputBaseProps,
    Stack,
    SxProps,
    Theme,
} from "@mui/material";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchCategory } from "./types";
import { useDebounce } from "use-debounce";
import ModeSelect from "./ModeSelect";
import dynamic from "next/dynamic";
import { addSearchHistory } from "./HistoryList/history";
import { HistoryListRef } from "./HistoryList";
import ResponsiveSearchInput from "./ResponsiveSearchInput";
const HistoryList = dynamic(() => import("./HistoryList"));
const SearchList = dynamic(() => import("./SearchList"));
import CloseIcon from "@mui/icons-material/Close";
import getBorderColor from "@/theme/borderColor";

const StartAdornmentSx: SxProps<Theme> = {
    height: 1,
    borderRight: { xs: 0, sm: "1px solid" },
    borderColor: ({ palette: { divider } }) => `${divider} !important`,
    borderRadius: 0,
};

const StartAdornment = () => (
    <InputAdornment position="start" sx={StartAdornmentSx}>
        <IconButton disableFocusRipple disableRipple>
            <SearchIcon />
        </IconButton>
    </InputAdornment>
);

// ------------------------------------------------------------------------------

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

const ClearButtonSx: SxProps<Theme> = {
    width: 24,
    height: 24,
    borderRadius: "50%",
    border: "1px solid",
    borderColor: getBorderColor,
    "& svg": {
        fontSize: "1.1rem",
        transform: "scale(0.8)",
    },
};

const DashboardNavbarSearch: FC<InputBaseProps> = ({ sx, ...props }) => {
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);
    const historyRef = useRef<HistoryListRef>(null);

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch] = useDebounce(searchText, 300);
    const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const isEmpty = searchText?.trim() === "";

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
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            addSearchHistory(searchText); // Add the search term to the history
        }
    };

    const handleFocus = () => {
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
        (h: { term: string; date: string }[]) =>
            historyRef.current?.setSearchHistory(h),
        []
    );

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    const handleClearSearch = () => {
        setSearchText("");
    };

    return (
        <>
            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                <div>
                    <ResponsiveSearchInput
                        ref={inputRef}
                        value={searchText}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        placeholder={t("Search") || ""}
                        onKeyDown={handleKeyDown}
                        sx={{
                            ...SearchInputSx,
                            ...sx,
                        }}
                        startAdornment={<StartAdornment />}
                        endAdornment={
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                {searchText ? (
                                    <IconButton
                                        onClick={handleClearSearch}
                                        sx={ClearButtonSx}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                ) : null}
                                <ModeSelect
                                    value={searchCategory}
                                    onChange={handleChangeCategory}
                                />
                            </Stack>
                        }
                        {...props}
                    />

                    {open && isEmpty ? (
                        <HistoryList
                            ref={historyRef}
                            onSelect={handleSelectHistory}
                        />
                    ) : null}
                </div>
            </ClickAwayListener>

            {anchorEl !== null && debouncedSearch && !isEmpty ? (
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
