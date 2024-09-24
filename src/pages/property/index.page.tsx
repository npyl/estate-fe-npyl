import type { NextPage } from "next";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
// filters
import FilterBar from "./(FiltersBar)";
import { optionType } from "./(FiltersBar)/types";
import { getOptions } from "./(FiltersBar)/constants";
// modes
import ViewAll from "./(ViewAll)";
import MediaCard from "./(MediaCard)";
const MapView = dynamic(() => import("./(MapView)"));

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
        <Box
            sx={{
                position: "relative",
                height: "100%", // WARN: make sure height is full so that bulk edit is full even if DataGrid is small
            }}
        >
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
        </Box>
    );
};

Home.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Home;
