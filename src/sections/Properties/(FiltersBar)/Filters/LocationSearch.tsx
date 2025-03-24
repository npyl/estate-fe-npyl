import PoppingSearch from "@/components/PoppingSearch";
import { ChangeEvent, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";
import { useFiltersContext } from "../../FiltersContext";

const Search = () => {
    const { t } = useTranslation();

    const [search, setSearch] = useState("");

    const { setLocationSearch, resetLocationSearch } = useFiltersContext();

    const debouncedSetSearch = useDebouncedCallback((v: string) => {
        setLocationSearch(v);
    }, 300);

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        debouncedSetSearch(e.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setSearch("");
        resetLocationSearch();
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
