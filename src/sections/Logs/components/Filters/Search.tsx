import PoppingSearch from "@/components/PoppingSearch";
import { ChangeEvent, useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useFiltersContext } from "./Context";

const Search = () => {
    const [value, setValue] = useState("");

    const { setSearch } = useFiltersContext();

    const debouncedSetSearch = useDebouncedCallback((v: string) => {
        setSearch(v);
    }, 300);
    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValue(v);
        debouncedSetSearch(v);
    }, []);

    const handleClear = useCallback(() => {
        setValue("");
        setSearch("");
    }, []);

    return (
        <PoppingSearch
            value={value}
            onChange={handleSearch}
            onClear={handleClear}
        />
    );
};

export default Search;
