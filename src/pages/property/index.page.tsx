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
    const [sortingBy, setSortingBy] = useState("updatedAt");
    const [sortingOrder, setSortingOrder] = useState("desc");

    const [isBulkEditOpen, openBulkEdit, closeBulkEdit] = useDialog();

    const sortingOptions = useSortingOptions();

    const handleSortingChange = useCallback((v: string) => {
        setSorting(v);

        if (v === sortingOptions[0].value) {
            setSortingBy("");
            setSortingOrder("");
        } else if (v === sortingOptions[1].value) {
            setSortingBy("price");
            setSortingOrder("asc");
        } else if (v === sortingOptions[2].value) {
            setSortingBy("price");
            setSortingOrder("desc");
        } else if (v === sortingOptions[3].value) {
            setSortingBy("area");
            setSortingOrder("asc");
        } else if (v === sortingOptions[4].value) {
            setSortingBy("price");
            setSortingOrder("desc");
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
                {optionViewProps.optionView === "list" && (
                    <ViewAll
                        sortingBy={sortingBy}
                        sortingOrder={sortingOrder}
                        // ...
                        isBulkEditOpen={isBulkEditOpen}
                        onBulkEditOpen={openBulkEdit}
                        onBulkEditClose={closeBulkEdit}
                    />
                )}
                {optionViewProps.optionView === "grid" && <MediaCard />}
                {optionViewProps.optionView === "map" && <MapView />}
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
