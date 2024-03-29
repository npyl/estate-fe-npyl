import type { NextPage } from "next";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import ViewAll from "./ViewAll";
import { Box, ButtonGroup, Paper, Stack, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SetStateAction, useState } from "react";
import { FilterSection } from "../components/Filters";
import FilterSortBy from "../components/Filters/FilterSortBy";
import { ViewModeButton } from "./styles";
import MediaCard from "./MediaCard";
import ChosenFilters from "../components/Filters/ChosenFilters";
import { Menu } from "src/icons/menu";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import { useSelector } from "react-redux";
import { sumOfChangedProperties } from "src/slices/filters";
import useDialog from "src/hooks/useDialog";
import MapView from "./MapView";

type optionType = "list" | "grid" | "map";

type viewOptionsType = {
    id: optionType;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    label: string;
};

const viewOptions: viewOptionsType[] = [
    {
        id: "list",
        icon: Menu,
        label: "List",
        // url:
    },
    {
        id: "grid",
        icon: GridViewIcon,
        label: "Grid",
    },
    {
        id: "map",
        icon: MapIcon,
        label: "Map",
    },
];

const Home: NextPage = () => {
    // view
    const [optionView, setOptionView] = useState<optionType>("list");

    // sorting
    const [sortingBy, setSortingBy] = useState("updatedAt");
    const [sortingOrder, setSortingOrder] = useState("desc");

    const changedPropertyFilters = useSelector(sumOfChangedProperties);

    const [isBulkEditOpen, openBulkEdit, closeBulkEdit] = useDialog();

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%", // WARN: make sure height is full so that bulk edit is full even if DataGrid is small
            }}
        >
            <Paper
                sx={{
                    p: 1,
                    my: 1,
                    marginRight: isBulkEditOpen ? 40 : 0,
                }}
            >
                <Stack direction={"row"} flex={1} flexWrap={"wrap"}>
                    <FilterSection />

                    <Stack direction={"row"} spacing={1}>
                        <FilterSortBy
                            onSorting={(
                                sortingBy: SetStateAction<string>,
                                sortingOrder: SetStateAction<string>
                            ) => {
                                setSortingBy(sortingBy);
                                setSortingOrder(sortingOrder);
                            }}
                        />

                        <ButtonGroup size="small">
                            {viewOptions.map((option) => (
                                <ViewModeButton
                                    key={option.id}
                                    selected={optionView === option.id}
                                    onClick={() => setOptionView(option.id)}
                                    sx={{
                                        ml: 1,
                                    }}
                                >
                                    <option.icon />
                                </ViewModeButton>
                            ))}
                        </ButtonGroup>
                    </Stack>
                </Stack>

                {changedPropertyFilters > 0 && (
                    <Box overflow={"auto"} mt={1}>
                        <ChosenFilters />
                    </Box>
                )}
            </Paper>

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
