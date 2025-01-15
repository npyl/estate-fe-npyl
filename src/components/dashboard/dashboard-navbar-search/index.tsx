import SearchIcon from "@mui/icons-material/Search";
import {
    ClickAwayListener,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
} from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchInput from "@/components/Search/SearchInput";
import { SearchCategory } from "./types";
import { useDebounce } from "use-debounce";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ModeSelect from "./ModeSelect";
import dynamic from "next/dynamic";
const SearchList = dynamic(() => import("./SearchList"));

const SEARCH_HISTORY_KEY = "search_history";

export const getSearchHistory = (): string[] => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
};

export const addSearchHistory = (searchTerm: string) => {
    const history = getSearchHistory();
    if (!history.includes(searchTerm)) {
        history.unshift(searchTerm); // Add to the beginning of the list
        if (history.length > 10) {
            // Limit the history to 10 items
            history.pop();
        }
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    }
};

const removeSearchHistoryItem = (searchTerm: string) => {
    const history = getSearchHistory();
    const updatedHistory = history.filter((item) => item !== searchTerm);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
};

const DashboardNavbarSearch: FC = () => {
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch] = useDebounce(searchText, 300);
    const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    // search history states
    const [searchHistory, setSearchHistory] =
        useState<string[]>(getSearchHistory);

    useEffect(() => {
        setSearchHistory(getSearchHistory());
    }, []);

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

    // search history functions
    const handleSelectHistory = (searchTerm: string, event: any) => {
        setSearchText(searchTerm);
        setAnchorEl(inputRef.current);
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

    const handleDeleteHistoryItem = (searchTerm: string, event: any) => {
        event.stopPropagation();
        const updatedHistory = removeSearchHistoryItem(searchTerm);
        setSearchHistory(updatedHistory);
    };

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
                            <InputAdornment position="start">
                                <IconButton
                                    disabled
                                    sx={{
                                        borderRight: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 0,
                                    }}
                                    color={"primary"}
                                    disableFocusRipple
                                    disableRipple
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        endAdornment={
                            <ModeSelect
                                value={searchCategory}
                                onChange={handleChangeCategory}
                            />
                        }
                    />

                    {open && searchText.trim() === "" && (
                        <List
                            sx={{
                                position: "absolute",
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "white"
                                        : "#001830",
                                boxShadow: 1,
                                width: { xs: "65vw", sm: "40vw" },
                                zIndex: 1500, // Ensure it appears above other elements
                                top: "50px", // Position below the input field
                            }}
                        >
                            {searchHistory.map((historyItem, index) => (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton
                                        onClick={(event: any) =>
                                            handleSelectHistory(
                                                historyItem,
                                                event
                                            )
                                        }
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            width="100%"
                                        >
                                            <Stack
                                                direction="row"
                                                gap={2}
                                                alignItems="center"
                                            >
                                                <HistoryOutlinedIcon
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette
                                                                .mode ===
                                                            "light"
                                                                ? theme.palette
                                                                      .neutral?.[700] ||
                                                                  theme.palette
                                                                      .grey[700] // Fallback to grey if neutral is undefined
                                                                : "white",
                                                        width: "16px",
                                                    }}
                                                />
                                                <ListItemText
                                                    primary={historyItem}
                                                    sx={{
                                                        color: (theme) =>
                                                            theme.palette
                                                                .mode ===
                                                            "light"
                                                                ? theme.palette
                                                                      .neutral?.[700] ||
                                                                  theme.palette
                                                                      .grey[700] // Fallback to grey if neutral is undefined
                                                                : "white",
                                                    }}
                                                />
                                            </Stack>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={(event: any) =>
                                                    handleDeleteHistoryItem(
                                                        historyItem,
                                                        event
                                                    )
                                                }
                                                sx={{
                                                    borderRadius: "100%",
                                                    padding: "3px",

                                                    "&:hover": {
                                                        backgroundColor:
                                                            "rgba(0, 0, 0, 0.1)",
                                                        borderRadius: "100%",

                                                        padding: "3px",
                                                    },
                                                    mr: 0.5,
                                                }}
                                            >
                                                <ClearOutlinedIcon
                                                    sx={{
                                                        // color: "neutral.700",
                                                        width: "16px",
                                                    }}
                                                />
                                            </IconButton>
                                        </Stack>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )}
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
                    updateSearchHistory={setSearchHistory}
                />
            ) : null}
        </>
    );
};

export default DashboardNavbarSearch;
