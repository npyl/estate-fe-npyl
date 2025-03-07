import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";
import dynamic from "next/dynamic";
// filters
import FilterBar from "@/sections/Properties/(FiltersBar)";
import { optionType } from "@/sections/Properties/(FiltersBar)/types";
import useCurrentSortingOption from "@/sections/Properties/(FiltersBar)/useCurrentSortingOption";
import { useQueryState } from "nuqs";
// modes
const ViewAll = dynamic(() => import("@/sections/Properties/(ViewAll)"));
const MediaCard = dynamic(() => import("@/sections/Properties/(MediaCard)"));
const MapView = dynamic(() => import("@/sections/Properties/(MapView)"));

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

const Home: NextPage = () => {
    const optionViewProps = useResponsiveOptionView();

    const { sortBy, direction } = useCurrentSortingOption()?.sorting || {
        sortBy: "modifiedAt",
        direction: "DESC",
    };

    return (
        <>
            <FilterBar
                {...optionViewProps}
                sx={{
                    position: "sticky",
                    top: 64,
                    zIndex: 1,
                }}
            />

            {optionViewProps.optionView === "list" ? (
                <ViewAll sortBy={sortBy} direction={direction} />
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

Home.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Home;
