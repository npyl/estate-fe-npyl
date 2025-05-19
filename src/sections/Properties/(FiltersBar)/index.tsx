import ChosenFilters from "./ChosenFilters";
import FilterSection from "./FiltersSection";
import { optionType } from "./types";
import { FC } from "react";
import useDialog from "@/hooks/useDialog";
import FilterMoreButton from "@/sections/Filters/FilterMore/Button";
import dynamic from "next/dynamic";
import FiltersBar, { FiltersBarProps } from "@/components/Filters/FiltersBar";
import { useFilterPropertiesQuery } from "@/services/properties";
import { useAllFilters, useSumOfChangedProperties } from "../FiltersContext";
const FilterMore = dynamic(() => import("./FilterMore"));

const PAGE_SIZE = 25;

const FilterMoreWrap = () => {
    const changedPropertyFilters = useSumOfChangedProperties();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();
    const filter = useAllFilters();

    //See if can be done better so i do not call again the filterProperties
    const { data } = useFilterPropertiesQuery({
        filter,
        page: 0,
        pageSize: PAGE_SIZE, // filters only one property just to get the totalProperties from the data
        sortBy: "modifiedAt",
        direction: "DESC",
    });
    //See if can be done better so i do not call again the filterProperties

    const totalProperties = data?.totalElements ?? 0;

    return (
        <>
            <FilterMoreButton
                changedFiltersCount={changedPropertyFilters}
                onClick={openDialog}
            />

            {isDialogOpen ? (
                <FilterMore
                    onClose={closeDialog}
                    totalProperties={totalProperties}
                />
            ) : null}
        </>
    );
};

interface PropertyFiltersBarProps
    extends Omit<FiltersBarProps, "bottomContent" | "filters"> {
    optionView: optionType;
    setOptionView: (o: optionType) => void;

    belowLg: boolean;
}

const PropertyFiltersBar: FC<PropertyFiltersBarProps> = ({
    optionView,
    setOptionView,

    belowLg,
    ...props
}) => {
    const changedPropertyFilters = useSumOfChangedProperties();

    return (
        <FiltersBar
            bottomContent={
                changedPropertyFilters > 0 ? <ChosenFilters /> : null
            }
            filters={
                <>
                    {belowLg ? null : <FilterSection />}
                    <FilterMoreWrap />
                </>
            }
            {...props}
        />
    );
};

export type { PropertyFiltersBarProps };
export default PropertyFiltersBar;
