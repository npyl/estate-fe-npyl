import type { NextPage } from "next";
import AuthGuard from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useCallback, useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";
import dynamic from "next/dynamic";
// filters
import FilterBar from "@/sections/Properties/(FiltersBar)";
import { optionType } from "@/sections/Properties/(FiltersBar)/types";
import useCurrentSortingOption from "@/sections/Properties/(FiltersBar)/useCurrentSortingOption";
import { useQueryState } from "nuqs";
import { FiltersProvider } from "@/sections/Properties/FiltersContext";
import { useTabsContext } from "@/contexts/tabs";
// modes
const ViewAll = dynamic(() => import("@/sections/Properties/(ViewAll)"));
const MediaCard = dynamic(() => import("@/sections/Properties/(MediaCard)"));
const MapView = dynamic(() => import("@/sections/Properties/(MapView)"));

// -----------------------------------------------------------------------

const useOptionView = () => {
    const [optionView, _setOptionView] = useQueryState<optionType>("view", {
        defaultValue: "list",
        parse: (v) => v as optionType,
    });

    const { setTabPath } = useTabsContext();
    const updateTabPath = useCallback(
        (v: optionType) => {
            const currentPath = `/property?view=${optionView}`;
            const newPath = `/property?view=${v}`;

            // setTabPath(currentPath, newPath);
        },
        [optionView]
    );

    // INFO: wrapper to update both optionView and respective tab path
    const setOptionView = useCallback(
        (v: optionType) => {
            _setOptionView(v);
            updateTabPath(v);
        },
        [updateTabPath]
    );

    return [optionView, setOptionView] as const;
};

const useResponsiveOptionView = () => {
    const belowLg = useResponsive("down", "lg");

    const [optionView, setOptionView] = useOptionView();

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
        <DashboardLayout>
            <FiltersProvider>{page}</FiltersProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default Home;
