import { useSelector } from "react-redux";
import { useDispatch } from "src/store";
import {
    sumOfChangedProperties,
    resetState,
    setManagerId,
} from "src/slices/filters";
import { FilterMoreDialog } from "@/sections/Filters/FilterMore";
import { useRouter } from "next/router"; // Import useRouter
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

const ChosenFilters = dynamic(() => import("./ChosenFilters"));

// ----------------------------------------------------------------------

type Props = {
    onClose: VoidFunction;
    totalProperties?: number;
};

export default function FilterMore({ onClose, totalProperties }: Props) {
    const dispatch = useDispatch();
    const router = useRouter(); // Use router to manipulate URL

    const changedPropsCount = useSelector(sumOfChangedProperties);

    const clearAll = () => {
        dispatch(resetState());

        // Remove 'assignee' from URL  if exists
        const newQuery = { ...router.query };
        delete newQuery.assignee;

        router.replace(
            { pathname: router.pathname, query: newQuery },
            undefined,
            { shallow: true } // Prevent page reload
        );
    };

    return (
        <FilterMoreDialog
            open
            onClose={onClose}
            onResetFilter={clearAll}
            totalProperties={totalProperties}
        >
            {changedPropsCount > 0 ? <ChosenFilters mb={1} /> : null}

            <Basic />

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
