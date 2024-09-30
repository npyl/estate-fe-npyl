import { dispatch, useSelector } from "src/store";
// Filters
import FilterParentCategory from "./Filters/ParentCategory";
import FilterCategory from "./Filters/Category";
import FilterLabels from "./Filters/Labels";
import PriceSelect from "./Filters/Price";
import SaleSelect from "./Filters/Sale";

import { resetState, selectLabels, setLabels } from "src/slices/filters";
import ActiveSelect from "./Filters/ActiveSelect";
import useDialog from "@/hooks/useDialog";
import FilterMore from "@/components/Filters/FilterMore/Dialog";
import FilterStatus from "@/pages/customers/(FilterSection)/Filters/Status";
import { sumOfChangedProperties } from "@/slices/customer/filters";

const FilterSection = () => {
    const labels = useSelector(selectLabels) || [];
    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const changedPropertyFilters = useSelector(sumOfChangedProperties);

    const clearAllSelectedFilters = () => {
        dispatch(resetState()); // Dispatch reset action to clear the filters
        dispatch(setLabels([]));
    };

    return (
        <>
            <SaleSelect />
            <FilterParentCategory />
            <FilterCategory />
            <PriceSelect type={"price"} />
            <PriceSelect type={"area"} />
            <FilterLabels
                variant="property"
                labels={labels}
                setLabels={setLabels}
            />
            <ActiveSelect />
            {isDialogOpen ? (
                <FilterMore
                    open={isDialogOpen}
                    onClose={closeDialog}
                    changedFiltersCount={changedPropertyFilters}
                    onResetFilter={clearAllSelectedFilters}
                >
                    {/* {filterContent} */}
                    <FilterStatus />{" "}
                    {/* the status is only visible inside the dialog! */}
                </FilterMore>
            ) : null}
        </>
    );
};

export default FilterSection;
