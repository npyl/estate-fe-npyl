import PoppingSearch from "@/components/PoppingSearch";
import { useFiltersContext } from "../../../sections/Tasks/filters";
import { ChangeEvent, useCallback } from "react";

const Search = () => {
    const { search, setSearch } = useFiltersContext();

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
