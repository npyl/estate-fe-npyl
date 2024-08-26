import SearchInput from "@/components/Search/SearchInput";
import { ChangeEvent, useCallback, useRef, useState } from "react";
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

    const anchorRef = useRef<HTMLInputElement>(null);

    const closeSearch = () => setSearch("");
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value);

    const handleCardClick = useCallback((propertyId: number) => {
        onSelectProperty(propertyId);
        closeSearch();
    }, []);

    return (
        <>
            <SearchInput
                ref={anchorRef}
                placeholder={t("Search property").toString()}
                value={search}
                onChange={handleChange}
            />

            {search ? (
                <ResultsPopper
                    anchorEl={anchorRef.current!}
                    // ...
                    isLoading={isLoading}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    pagination={pagination}
                    content={content}
                    // ...
                    onCardClick={handleCardClick}
                    onClose={closeSearch}
                />
            ) : null}
        </>
    );
};

export default PropertySearch;
