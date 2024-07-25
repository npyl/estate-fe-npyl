import SearchInput from "@/components/SearchInput";
import { useCallback, useMemo, useRef, useState } from "react";
import { useSearchPropertyQuery } from "@/services/properties";
import { useDebounce } from "use-debounce";
import { usePagination } from "@/components/Pagination";
import ResultsPopper from "./Popper";
import { PaginationHookProps } from "@/components/Pagination/types";
import useDialog from "@/hooks/useDialog";
import Portal from "@mui/material/Portal";

const pageSize = 5;

const useSearchContent = (
    pagination: PaginationHookProps,
    searchString: string
) => {
    const { data, isLoading } = useSearchPropertyQuery({
        searchString,
        page: pagination.page,
        pageSize,
    });

    const content = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

    return {
        content,
        isLoading,
        totalElements: data?.totalElements || pageSize,
    };
};

interface SearchProps {
    onSelectProperty: (id: number) => void;
}

const Search: React.FC<SearchProps> = ({ onSelectProperty }) => {
    const [search, setSearch] = useState("");
    const [searchString] = useDebounce(search, 300);

    const pagination = usePagination();

    const { content, isLoading, totalElements } = useSearchContent(
        pagination,
        searchString
    );

    const anchorRef = useRef<HTMLDivElement>(null);
    const [isSearchOpen, openSearch, closeSearch] = useDialog();

    const handleCardClick = useCallback((propertyId: number) => {
        setSearch("");
        onSelectProperty(propertyId);
        closeSearch();
    }, []);

    return (
        <>
            <SearchInput
                ref={anchorRef}
                placeholder="Search property"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    openSearch();
                }}
            />

            {isSearchOpen ? (
                <Portal>
                    <ResultsPopper
                        open
                        anchorEl={anchorRef.current}
                        // ...
                        isLoading={isLoading}
                        totalElements={totalElements}
                        pageSize={pageSize}
                        pagination={pagination}
                        content={content}
                        onCardClick={handleCardClick}
                        onClose={closeSearch}
                    />
                </Portal>
            ) : null}
        </>
    );
};

export default Search;
