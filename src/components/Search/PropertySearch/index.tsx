import SearchInput from "@/components/Search/SearchInput";
import { ChangeEvent, ComponentType, useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { usePagination } from "@/components/Pagination";
import { useTranslation } from "react-i18next";
import { useSearchContent } from "./hook";
import { pageSize } from "./constants";
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import { IPropertyResultResponse } from "@/types/properties";
const ResultsPopper = dynamic(() => import("./Popper"));

interface PropertySearchProps {
    showEmpty?: boolean;
    customerId?: number;
    NoResultsPlaceholder?: ComponentType;
    onSelectProperty: (p: IPropertyResultResponse) => void;
}

const PropertySearch: React.FC<PropertySearchProps> = ({
    showEmpty = false,
    customerId,
    NoResultsPlaceholder,
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setSearch(e.target.value);

    const handleCardClick = useCallback((p: IPropertyResultResponse) => {
        onSelectProperty(p);
        closeAnyway();
    }, []);

    // INFO: contradicts showEmpty
    const [isOpenAnyway, openAnyway, closeAnyway] = useDialog();

    return (
        <>
            <SearchInput
                ref={setAnchorEl}
                placeholder={t("Search property").toString()}
                value={search}
                onClick={openAnyway}
                onChange={handleChange}
            />

            {anchorEl && (search || showEmpty) && isOpenAnyway ? (
                <ResultsPopper
                    anchorEl={anchorEl}
                    // ...
                    isLoading={isLoading}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    pagination={pagination}
                    content={content}
                    NoResultsPlaceholder={NoResultsPlaceholder}
                    // ...
                    onCardClick={handleCardClick}
                    onClose={closeAnyway}
                />
            ) : null}
        </>
    );
};

export default PropertySearch;
