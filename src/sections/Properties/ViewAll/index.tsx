import { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";
import dynamic from "next/dynamic";
import { optionType } from "@/sections/Properties/(FiltersBar)/types";
import useCurrentSortingOption from "@/sections/Properties/(FiltersBar)/useCurrentSortingOption";
import { useQueryState } from "nuqs";
import FilterBar from "./FilterBar";
// modes
const ListView = dynamic(
    () => import("@/sections/Properties/ViewAll/(ListView)")
);
const MediaCard = dynamic(
    () => import("@/sections/Properties/ViewAll/(MediaCard)")
);
const MapView = dynamic(
    () => import("@/sections/Properties/ViewAll/(MapView)")
);

// -----------------------------------------------------------------------

const useResponsiveOptionView = () => {
    const belowLg = useResponsive("down", "lg");

    const [optionView, setOptionView] = useQueryState<optionType>("view", {
        defaultValue: "list",
        parse: (v) => v as optionType,
    });

    // Start with grid view by default on small displays
    useEffect(() => {
        if (belowLg) setOptionView("grid");
    }, [belowLg]);

    return { optionView, setOptionView, belowLg };
};

// -----------------------------------------------------------------------

const ViewAll = () => {
    const optionViewProps = useResponsiveOptionView();

    const { sortBy, direction } = useCurrentSortingOption()?.sorting || {
        sortBy: "modifiedAt",
        direction: "DESC",
    };

    return (
        <>
            <FilterBar {...optionViewProps} />

            {optionViewProps.optionView === "list" ? (
                <ListView sortBy={sortBy} direction={direction} />
            ) : null}
            {optionViewProps.optionView === "grid" ? (
                <MediaCard sortBy={sortBy} direction={direction} />
            ) : null}
            {optionViewProps.optionView === "map" ? (
                <MapView sortBy={sortBy} direction={direction} />
            ) : null}
        </>
    );
};

export default ViewAll;
