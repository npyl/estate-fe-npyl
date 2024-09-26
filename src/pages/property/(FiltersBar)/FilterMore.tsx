import { useSelector } from "react-redux";
import { useDispatch } from "src/store";
import { sumOfChangedProperties, resetState } from "src/slices/filters";
import ChosenFilters from "./Filters/ChosenFilters";
import { FilterMoreDialog } from "@/components/Filters/FilterMore";
import Bedrooms from "./Filters/Bedrooms";
import ConstructionYear from "./Filters/ConstructionYear";
import Floors from "./Filters/Floors";
import Fields from "./Filters/Fields";
import Basic from "./Filters/Basic";
import Type from "./CompactFilters/Type";
import Category from "./CompactFilters/Category";
import ParentCategory from "./CompactFilters/ParentCategory";

// ----------------------------------------------------------------------

type Props = {
    onClose: VoidFunction;
};

export default function FilterMore({ onClose }: Props) {
    const dispatch = useDispatch();

    const changedPropsCount = useSelector(sumOfChangedProperties);

    const clearAll = () => dispatch(resetState());

    return (
        <FilterMoreDialog open onClose={onClose} onResetFilter={clearAll}>
            {changedPropsCount > 0 ? <ChosenFilters /> : null}

            <Basic />
            <Type />

            <Category />
            <ParentCategory />

            <Bedrooms />
            <Floors />
            <Fields />
            <ConstructionYear />
        </FilterMoreDialog>
    );
}
