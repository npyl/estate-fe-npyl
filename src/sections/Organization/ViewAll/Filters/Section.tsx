import FiltersBar from "@/components/Filters/FiltersBar";
import PoppingSearch from "@/components/PoppingSearch";
import { ChangeEvent, useCallback } from "react";
import { useFiltersContext } from "./Context";

const SearchFilter = () => {
    const { filters, setSearch } = useFiltersContext();
    const { search } = filters || {};

    const handleSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
        []
    );

    const handleClear = useCallback(() => setSearch(""), []);

    return (
        <PoppingSearch
            value={search}
            onChange={handleSearch}
            onClear={handleClear}
        />
    );
};

const FiltersSection = () => (
    <FiltersBar
        filters={
            <>
                <SearchFilter />
            </>
        }
        bottomContent={undefined}
    />
);

export default FiltersSection;
