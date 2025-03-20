import PoppingSearch from "@/components/PoppingSearch";
import { resetLocationSearch, setLocationSearch } from "@/slices/filters";
import { ChangeEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [search, setSearch] = useState("");

    const debouncedSetSearch = useDebouncedCallback((v: string) => {
        dispatch(setLocationSearch(v));
    }, 300);

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSetSearch(e.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setSearch("");
        dispatch(resetLocationSearch());
    }, []);

    return (
        <PoppingSearch
            label={t("Search Location")}
            value={search}
            onChange={handleSearch}
            onClear={handleClear}
        />
    );
};

export default Search;
