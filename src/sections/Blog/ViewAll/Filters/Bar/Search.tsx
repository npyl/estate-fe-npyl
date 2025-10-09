import PoppingSearch from "@/components/PoppingSearch";
import { useFiltersContext } from "@/sections/Blog/ViewAll/Filters/Context";
import { useCallback } from "react";

const Search = () => {
    const { filters, setSearch } = useFiltersContext();
    const { search } = filters || {};

    const handleClear = useCallback(() => setSearch(""), []);

    return (
        <PoppingSearch
            value={search}
            onChange={setSearch}
            onClear={handleClear}
        />
    );
};

export default Search;
