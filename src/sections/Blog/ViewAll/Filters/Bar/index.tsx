import PPFiltersBar from "@/components/Filters/FiltersBar";
import Search from "./Search";
import Sites from "./Sites";
import User from "./User";
import State from "./State";

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
        bottomContent={undefined}
    />
);

export default FiltersBar;
