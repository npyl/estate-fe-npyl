import SearchInput from "@/components/SearchInput";
import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePagination } from "@/components/Pagination";
import { useTranslation } from "react-i18next";
import { useSearchContent } from "./hook";
import { pageSize } from "./constants";
import dynamic from "next/dynamic";
const ResultsPopper = dynamic(() => import("./Popper"));

interface PropertySearchProps {
    customerId?: number;
    onSelectProperty: (id: number) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({
    customerId,
    onSelectProperty,
}) => {
    const { t } = useTranslation();

    const [search, setSearch] = useState("");
    const [searchString] = useDebounce(search, 300);

    const pagination = usePagination();

    const { content, isLoading, totalElements } = useSearchContent(
        pagination,
        searchString,
        customerId
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

export default PropertySearch;
