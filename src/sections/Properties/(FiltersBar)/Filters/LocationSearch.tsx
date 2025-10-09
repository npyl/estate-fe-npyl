import PoppingSearch from "@/components/PoppingSearch";
import { useTranslation } from "react-i18next";
import { useFiltersContext, useLocationSearch } from "../../FiltersContext";

const Search = () => {
    const { t } = useTranslation();

    const locationSearch = useLocationSearch() ?? "";
    const { setLocationSearch, resetLocationSearch } = useFiltersContext();

    return (
        <PoppingSearch
            label={t("Search Location")}
            value={locationSearch}
            onChange={setLocationSearch}
            onClear={resetLocationSearch}
        />
    );
};

export default Search;
