import PPFiltersBar from "@/components/Filters/FiltersBar";
import Search from "./Search";
import Sites from "./Sites";

const FiltersBar = () => (
    <PPFiltersBar
        filters={
            <>
                <Search />
                <Sites />
            </>
        }
        bottomContent={undefined}
    />
);

export default FiltersBar;
