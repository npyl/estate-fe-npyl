import type { NextPage } from "next";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAll from "./ViewAll";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import useDialog from "src/hooks/useDialog";
import MapView from "./MapView";
import FilterBar from "./FiltersBar/FiltersBar";
import { optionType } from "./FiltersBar/types";
import { useSortingOptions } from "./FiltersBar/constants";
import useResponsive from "@/hooks/useResponsive";

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

const Home: NextPage = () => {
    const optionViewProps = useResponsiveOptionView();

    // sorting
    const [sorting, setSorting] = useState("default"); // general
    const [sortBy, setSortBy] = useState("updatedAt");
    const [direction, setDirection] = useState<"ASC" | "DESC">("DESC");

    const [isBulkEditOpen, openBulkEdit, closeBulkEdit] = useDialog();

    const sortingOptions = useSortingOptions();

    // TODO: check if this can be eliminated
    const handleSortingChange = useCallback((v: string) => {
        setSorting(v);

        if (v === sortingOptions[0].value) {
            setSortBy("updatedAt");
            setDirection("DESC");
        } else if (v === sortingOptions[1].value) {
            setSortBy("price");
            setDirection("ASC");
        } else if (v === sortingOptions[2].value) {
            setSortBy("price");
            setDirection("DESC");
        } else if (v === sortingOptions[3].value) {
            setSortBy("area");
            setDirection("ASC");
        } else if (v === sortingOptions[4].value) {
            setSortBy("area");
            setDirection("DESC");
        } else if (v === sortingOptions[5].value) {
            setSortBy("visitors");
            setDirection("ASC");
        } else if (v === sortingOptions[6].value) {
            setSortBy("visitors");
            setDirection("DESC");
        }
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%", // WARN: make sure height is full so that bulk edit is full even if DataGrid is small
            }}
        >
            <FilterBar
                sorting={sorting}
                onSortingChange={handleSortingChange}
                // ...
                {...optionViewProps}
            />

            <>
                {optionViewProps.optionView === "list" ? (
                    <ViewAll
                        sortBy={sortBy}
                        direction={direction}
                        // ...
                        isBulkEditOpen={isBulkEditOpen}
                        onBulkEditOpen={openBulkEdit}
                        onBulkEditClose={closeBulkEdit}
                    />
                ) : null}
                {optionViewProps.optionView === "grid" ? (
                    <MediaCard sortBy={sortBy} direction={direction} />
                ) : null}
                {optionViewProps.optionView === "map" ? <MapView /> : null}
            </>
        </Box>
    );
};

Home.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Home;
