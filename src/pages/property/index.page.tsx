import type { NextPage } from "next";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { useEffect, useMemo, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
// filters
import FilterBar from "@/sections/Properties/(FiltersBar)";
import { optionType } from "@/sections/Properties/(FiltersBar)/types";
import { getOptions } from "@/sections/Properties/(FiltersBar)/constants";
// modes
import ViewAll from "@/sections/Properties/(ViewAll)";
import MediaCard from "@/sections/Properties/(MediaCard)";
const MapView = dynamic(() => import("@/sections/Properties/(MapView)"));

// -----------------------------------------------------------------------

const useResponsiveOptionView = () => {
    const belowLg = useResponsive("down", "lg");

    // view
    const [optionView, setOptionView] = useState<optionType>("list");

    // Start with grid view by default on small displays
    useEffect(() => {
        if (belowLg) setOptionView("grid");
    }, [belowLg]);

    return { optionView, setOptionView, belowLg };
};

// -----------------------------------------------------------------------

const Home: NextPage = () => {
    const { t } = useTranslation();

    const optionViewProps = useResponsiveOptionView();

    // sorting
    const sortingOptions = useMemo(() => getOptions(t), [t]);
    const [sorting, setSorting] = useState("default"); // general
    const { sortBy, direction } = useMemo(
        () =>
            sortingOptions.find(({ value }) => value === sorting)?.sorting || {
                sortBy: "updatedAt",
                direction: "DESC",
            },
        [sortingOptions, sorting]
    );

    return (
        <>
            <FilterBar
                sorting={sorting}
                onSortingChange={setSorting}
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
