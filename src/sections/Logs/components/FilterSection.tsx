import FilterActions from "./Filters/FilterActions";
import DateSelect from "./Filters/FilterDate";
import FilterLogManager from "./Filters/FilterManager";
import FilterResources from "./Filters/FilterResources";
import OrganizationFilter from "./Filters/Organization";
import Search from "./Filters/Search";

export const FilterLogSection = () => (
    <>
        <Search />
        <FilterActions />
        <FilterResources />
        <DateSelect />
        <FilterLogManager />
        <OrganizationFilter />
    </>
);
