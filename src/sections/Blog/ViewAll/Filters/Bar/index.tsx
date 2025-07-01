import PPFiltersBar from "@/components/Filters/FiltersBar";
import Search from "./Search";
import Sites from "./Sites";
import User from "./User";

const FiltersBar = () => (
    <PPFiltersBar
        filters={
            <>
                <Search />
                <Sites />
                <User />
            </>
        }
        bottomContent={undefined}
    />
);

export default FiltersBar;
