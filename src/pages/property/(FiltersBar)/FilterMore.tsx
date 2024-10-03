import { useSelector } from "react-redux";
import { useDispatch } from "src/store";
import { sumOfChangedProperties, resetState } from "src/slices/filters";
import { FilterMoreDialog } from "@/components/Filters/FilterMore";
import ConstructionYear from "./Filters/ConstructionYear";
import Floors from "./CompactFilters/Floors";
import Fields from "./CompactFilters/Fields";
import Basic from "./Filters/Basic";
import State from "./CompactFilters/State";
import Category from "./CompactFilters/Category";
import ParentCategory from "./CompactFilters/ParentCategory";
import dynamic from "next/dynamic";
import Beds from "./CompactFilters/Beds";
const ChosenFilters = dynamic(() => import("./ChosenFilters"));

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
            {changedPropsCount > 0 ? <ChosenFilters mb={1} /> : null}

            <Basic />

            <State />
            <ParentCategory />
            <Category />

            <Beds />
            <Floors />
            <Fields />
            <ConstructionYear />
        </FilterMoreDialog>
    );
}
