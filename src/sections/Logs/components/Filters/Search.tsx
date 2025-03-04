import PoppingSearch from "@/components/PoppingSearch";
import { setSearch } from "@/slices/log";
import { ChangeEvent, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState("");

    const debouncedSetSearch = useDebouncedCallback((v: string) => {
        dispatch(setSearch(v));
    }, 300);
    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValue(v);
        debouncedSetSearch(v);
    }, []);

    const handleClear = useCallback(() => {
        setValue("");
        dispatch(setSearch(""));
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
