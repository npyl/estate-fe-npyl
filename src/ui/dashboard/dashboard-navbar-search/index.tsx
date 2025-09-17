import { ClickAwayListener, SxProps, Theme } from "@mui/material";
import { FC, useCallback, useRef, useState } from "react";
import { SearchCategory } from "./types";
import { useDebounce } from "use-debounce";
import SearchList, { SearchListRef } from "./SearchList";
import Input from "./Input";

// ------------------------------------------------------------------------------

interface Props {
    sx?: SxProps<Theme>;
}

const DashboardNavbarSearch: FC<Props> = ({ sx }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const searchListRef = useRef<SearchListRef>(null);

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch] = useDebounce(searchText, 300);

    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
    };

    const [searchCategory, setSearchCategory] = useState<SearchCategory>("all");

    const handleFocus = useCallback(() => {
        const el = inputRef.current;
        if (!el) return;
        searchListRef.current?.open(el);
    }, []);

    const onClose = useCallback(() => {
        searchListRef.current?.close();
    }, []);
    const handleClearSearch = useCallback(() => {
        setSearchText("");
        onClose();
    }, []);

    return (
        <ClickAwayListener onClickAway={onClose}>
            <div>
                <Input
                    ref={inputRef}
                    value={searchText}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    // ...
                    onClear={handleClearSearch}
                    searchCategory={searchCategory}
                    onSearchCategoryChange={setSearchCategory}
                    // ...
                    sx={sx}
                />

                <SearchList
                    ref={searchListRef}
                    searchString={debouncedSearch}
                    searchCategory={searchCategory}
                    onSelectHistoryItem={setSearchText}
                />
            </div>
        </ClickAwayListener>
    );
};

export default DashboardNavbarSearch;
