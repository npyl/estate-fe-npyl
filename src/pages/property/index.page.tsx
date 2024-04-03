import type { NextPage } from "next";
import { AuthGuard } from "@/components/authentication/auth-guard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import ViewAll from "./ViewAll";
import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import MediaCard from "./MediaCard";
import useDialog from "src/hooks/useDialog";
import MapView from "./MapView";
import FilterBar from "./FiltersBar/FiltersBar";
import { optionType } from "./FiltersBar/types";
import { useSortingOptions } from "./FiltersBar/constants";

const Home: NextPage = () => {
    // view
    const [optionView, setOptionView] = useState<optionType>("list");

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
                optionView={optionView}
                setOptionView={setOptionView}
            />

            <>
                {optionView === "list" && (
                    <ViewAll
                        sortingBy={sortingBy}
                        sortingOrder={sortingOrder}
                        // ...
                        isBulkEditOpen={isBulkEditOpen}
                        onBulkEditOpen={openBulkEdit}
                        onBulkEditClose={closeBulkEdit}
                    />
                )}
                {optionView === "grid" && <MediaCard />}
                {optionView === "map" && <MapView />}
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
