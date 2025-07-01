import PPFiltersBar from "@/components/Filters/FiltersBar";
import Search from "./Search";
import Sites from "./Sites";
import User from "./User";
import State from "./State";
import ChosenFilters from "./ChosenFilters";

const FiltersBar = () => (
    <PPFiltersBar
        filters={
            <>
                <Search />
                <User />
                <Sites />
                <State />
            </>
        }
        bottomContent={<ChosenFilters />}
    />
);

export default FiltersBar;
