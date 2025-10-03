import PoppingSearch from "@/components/PoppingSearch";
import { useFiltersContext } from "@/sections/Tasks/filters";
import { useCallback } from "react";

const Search = () => {
    const { filters, setSearch } = useFiltersContext();
    const { search } = filters || {};
    const onClear = useCallback(() => setSearch(""), []);
    return (
        <PoppingSearch value={search} onChange={setSearch} onClear={onClear} />
    );
};

export default Search;
