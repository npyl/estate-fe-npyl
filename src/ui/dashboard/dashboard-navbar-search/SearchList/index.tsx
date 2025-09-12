import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { SearchCategory } from "../types";
import Popover, { PopoverProps } from "../Popover";
import SearchHistory from "./SearchHistory";
import dynamic from "next/dynamic";
const SearchResults = dynamic(() => import("./SearchResults"));

interface SearchListRef {
    open: (anchorEl: HTMLElement) => void;
    close: VoidFunction;
}

interface SearchListProps
    extends Omit<
        PopoverProps,
        "open" | "anchorEl" | "children" | "historyMode"
    > {
    searchString: string;
    searchCategory: SearchCategory;
    onSelectHistoryItem: (s: string) => void;
}

const SearchList = forwardRef<SearchListRef, SearchListProps>(
    ({ searchString, searchCategory, onSelectHistoryItem, ...props }, ref) => {
        const isHistoryMode = !searchString;

        const [anchorEl, setAnchorEl] = useState<HTMLElement>();
        const isOpen = Boolean(anchorEl);
        const close = useCallback(() => setAnchorEl(undefined), []);

        useImperativeHandle(ref, () => ({ open: setAnchorEl, close }), []);

        if (!anchorEl) return null;

        return (
            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                historyMode={isHistoryMode}
                {...props}
            >
                {searchString ? (
                    <SearchResults
                        searchString={searchString}
                        searchCategory={searchCategory}
                        onClose={close}
                    />
                ) : null}

                {!searchString ? (
                    <SearchHistory onSelect={onSelectHistoryItem} />
                ) : null}
            </Popover>
        );
    }
);

export type { SearchListRef };
export default SearchList;
