import PoppingSearch from "@/components/PoppingSearch";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { ChangeEvent, useCallback } from "react";

const Search = () => {
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

export default Search;
