import SearchInput from "@/components/SearchInput";
import { useCallback, useMemo, useState } from "react";
import { useSearchPropertyQuery } from "@/services/properties";
import { useDebounce } from "use-debounce";
import { usePagination } from "@/components/Pagination";
import ResultsPopper from "./Popper";
import { PaginationHookProps } from "@/components/Pagination/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const pageSize = 5;

const useSearchContent = (
    pagination: PaginationHookProps,
    searchString: string
) => {
    const router = useRouter();
    const { customerId } = router.query;

    const { data, isLoading } = useSearchPropertyQuery({
        searchString,
        page: pagination.page,
        pageSize,
        customer: !!customerId ? +customerId : undefined,
    });

    const content = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

    return {
        content,
        isLoading,
        totalElements: data?.totalElements || 0,
    };
};

interface SearchProps {
    onSelectProperty: (id: number) => void;
}

const Search: React.FC<SearchProps> = ({ onSelectProperty }) => {
    const { t } = useTranslation();

    const [search, setSearch] = useState("");
    const [searchString] = useDebounce(search, 300);

    const pagination = usePagination();

    const { content, isLoading, totalElements } = useSearchContent(
        pagination,
        searchString
    );

    const [anchorEl, setAnchorEl] = useState<HTMLInputElement>();
    const closeSearch = () => setAnchorEl(undefined);

    const handleCardClick = useCallback((propertyId: number) => {
        setSearch("");
        onSelectProperty(propertyId);
        closeSearch();
    }, []);

    return (
        <>
            <SearchInput
                placeholder={t("Search property").toString()}
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setAnchorEl(e.currentTarget as any);
                }}
            />

            {!!anchorEl ? (
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
                    onClose={closeSearch}
                />
            ) : null}
        </>
    );
};

export default Search;
