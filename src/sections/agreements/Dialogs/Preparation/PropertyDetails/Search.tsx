import SearchInput from "@/components/SearchInput";
import { useCallback, useMemo, useState } from "react";
import { useSearchPropertyQuery } from "@/services/properties";
import { useDebounce } from "use-debounce";
import { usePagination } from "@/components/Pagination";
import ResultsPopper from "./Popper";
import { PaginationHookProps } from "@/components/Pagination/types";

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleCardClick = useCallback((propertyId: number) => {
        setSearch("");
        onSelectProperty(propertyId);
        setAnchorEl(null);
    }, []);
    const handleClose = useCallback(() => setAnchorEl(null), []);

    return (
        <>
            <SearchInput
                sx={{
                    width: "50%",
                }}
                placeholder="Search property"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setAnchorEl(e.currentTarget);
                }}
            />

            {anchorEl ? (
                <ResultsPopper
                    open
                    anchorEl={anchorEl}
                    // ...
                    isLoading={isLoading}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    pagination={pagination}
                    content={content}
                    onCardClick={handleCardClick}
                    onClose={handleClose}
                />
            ) : null}
        </>
    );
};

export default Search;
