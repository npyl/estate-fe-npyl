import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { SearchCategory } from "../types";
import Popover, { PopoverProps } from "../Popover";
import SearchHistory from "./SearchHistory";
import SearchResults from "./SearchResults";

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
}

const SearchList = forwardRef<SearchListRef, SearchListProps>(
    ({ searchString, searchCategory, ...props }, ref) => {
        const isHistoryMode = !searchString;

        const [anchorEl, setAnchorEl] = useState<HTMLElement>();
        const close = useCallback(() => setAnchorEl(undefined), []);

        useImperativeHandle(ref, () => ({ open: setAnchorEl, close }), []);

        if (!anchorEl) return null;

        return (
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                historyMode={isHistoryMode}
                {...props}
            >
                {searchString ? (
                    <SearchResults
                        searchString={searchString}
                        searchCategory={searchCategory}
                    />
                ) : null}

                {!searchString ? <SearchHistory onSelect={() => {}} /> : null}
            </Popover>
        );
    }
);

export type { SearchListRef };
export default SearchList;
