import PoppingSearch from "@/components/PoppingSearch";
import { useCallback } from "react";
import { useFiltersContext, useSelectSearch } from "./Context";

const Search = () => {
    const search = useSelectSearch();
    const { setSearch } = useFiltersContext();
    const onClear = useCallback(() => setSearch(""), []);
    return (
        <PoppingSearch value={search} onChange={setSearch} onClear={onClear} />
    );
};

export default Search;
