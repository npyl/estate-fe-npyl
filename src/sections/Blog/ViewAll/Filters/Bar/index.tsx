import PPFiltersBar from "@/components/Filters/FiltersBar";
import Search from "./Search";
import Sites from "./Sites";
import User from "./User";
import State from "./State";
import ChosenFilters from "./ChosenFilters";
import Categories from "./Categories";

const FiltersBar = () => (
    <PPFiltersBar
        filters={
            <>
                <Search />
                <User />
                <Sites />
                <State />
                <Categories />
            </>
        }
        bottomContent={<ChosenFilters />}
    />
);

export default FiltersBar;
