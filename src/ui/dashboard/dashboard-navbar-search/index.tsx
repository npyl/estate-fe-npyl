import { SxProps, Theme } from "@mui/material";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SearchCategory } from "./types";
import { useDebounce } from "use-debounce";
import dynamic from "next/dynamic";
import { HistoryListRef } from "./HistoryList";
import Input from "./Input";
const HistoryList = dynamic(() => import("./HistoryList"));
const SearchList = dynamic(() => import("./SearchList"));

// ------------------------------------------------------------------------------

interface Props {
    sx?: SxProps<Theme>;
}

const DashboardNavbarSearch: FC<Props> = ({ sx }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
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

    const handleKeyDown = useCallback((event: any) => {
        if (event.key !== "Enter") return;
        historyRef.current?.addSearchHistoryItem(searchText); // Add the search term to the history
    }, []);

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

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    const handleClearSearch = () => setSearchText("");

    return (
        <>
            <Input
                ref={inputRef}
                value={searchText}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                // ...
                onClear={handleClearSearch}
                searchCategory={searchCategory}
                onSearchCategoryChange={handleChangeCategory}
                // ...
                sx={sx}
            />

            {open && isEmpty ? (
                <HistoryList ref={historyRef} onSelect={handleSelectHistory} />
            ) : null}

            {anchorEl !== null && debouncedSearch && !isEmpty ? (
                <SearchList
                    open
                    anchorEl={anchorEl}
                    searchString={debouncedSearch}
                    searchCategory={searchCategory}
                    onClose={handleClearSearch}
                />
            ) : null}
        </>
    );
};

export default DashboardNavbarSearch;
