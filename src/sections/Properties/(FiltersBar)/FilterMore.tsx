import { FilterMoreDialog } from "@/sections/Filters/FilterMore";
import ConstructionYear from "./Filters/ConstructionYear";
import Floors from "./CompactFilters/Floors";
import Fields from "./CompactFilters/Fields";
import Basic from "./Filters/Basic";
import State from "./CompactFilters/State";
import Category from "./CompactFilters/Category";
import ParentCategory from "./CompactFilters/ParentCategory";
import dynamic from "next/dynamic";
import Beds from "./CompactFilters/Beds";
import Lifestyle from "./CompactFilters/Lifestyle";
import Integration from "./CompactFilters/Integration";
import {
    useFiltersContext,
    useSumOfChangedProperties,
} from "../FiltersContext";

const ChosenFilters = dynamic(() => import("./ChosenFilters"));

// ----------------------------------------------------------------------

type Props = {
    onClose: VoidFunction;
    totalProperties?: number;
};

export default function FilterMore({ onClose, totalProperties }: Props) {
    const { resetState } = useFiltersContext();
    const changedPropsCount = useSumOfChangedProperties();

    return (
        <FilterMoreDialog
            open
            onClose={onClose}
            onResetFilter={resetState}
            totalProperties={totalProperties}
        >
            {changedPropsCount > 0 ? <ChosenFilters mb={1} /> : null}

            <Basic />

            <Integration />

            <State />
            <Lifestyle />
            <ParentCategory />
            <Category />

            <Beds />
            <Floors />
            <Fields />
            <ConstructionYear />
        </FilterMoreDialog>
    );
}
