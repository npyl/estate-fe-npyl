import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import {
    ButtonGroup,
    Grid,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    SvgIconTypeMap,
    Typography,
    Box,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import {
    GridCallbackDetails,
    GridCellParams,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { FC, SetStateAction, useEffect, useMemo, useState } from "react";
import Image from "src/components/image";
import { Menu } from "src/icons/menu";
import {
    useDeletePropertyMutation,
    useFilterPropertiesMutation,
} from "src/services/properties";
import DataGridTable from "../../components/DataGrid";
import MapView from "./MapView";
import MediaCard from "./MediaCard";
import { FilterSection } from "./Filters";
import FilterRows from "./Filters/FilterRows";
import FilterSortBy from "./Filters/FilterSortBy";
import { selectAll, sumOfChangedProperties } from "src/slices/filters";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BulkEditDrawer } from "./BulkEdit/BulkEdit";
import { DeleteDialog } from "src/components/Dialog/Delete";
import ChosenFilters from "./Filters/ChosenFilters";

type optionType = "list" | "grid" | "map";

type viewOptionsType = {
    id: optionType;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    label: string;
};

const ViewAll: FC = () => {
    const { t } = useTranslation();

    const [bulkEditOpen, setBulkEditOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    const changedPropertyFilters = useSelector(sumOfChangedProperties);

    // sorting
    const [sortingBy, setSortingBy] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");
    // pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    // view
    const [optionView, setOptionView] = useState<optionType>("list");

    const allFilters = useSelector(selectAll);

    const [deleteProperty] = useDeletePropertyMutation();
    const [filterProperties, { isLoading, data }] =
        useFilterPropertiesMutation();

    const revalidate = () => {
        filterProperties({
            filter: allFilters,
            page: page,
            pageSize: pageSize,
        });
    };

    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize]);

    const rows = useMemo(() => {
        return data?.content ? data?.content : [];
    }, [data?.content]);

    const totalRows = useMemo(
        () => (data?.totalElements ? data?.totalElements : 100000),
        [data?.totalElements]
    );

    const viewOptions: viewOptionsType[] = [
        {
            id: "list",
            icon: Menu,
            label: "List",
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

    function renderImage(params: GridCellParams) {
        return (
            <>
                <Image
                    src={`${params.formattedValue}` || ""}
                    alt=""
                    ratio="16/9"
                />
            </>
        );
    }

    type PropertyStatus =
        | "SOLD"
        | "SALE"
        | "RENTED"
        | "UNAVAILABLE"
        | "RENT"
        | "TAKEN"
        | "UNDER_CONSTRUCTION"
        | "UNDER_MAINTENANCE";

    type Color = string;

    type StatusColors = Record<PropertyStatus, Color>;

    const STATUS_COLORS: StatusColors = {
        SOLD: "#79798a",
        SALE: "#57825e",
        RENT: "#bd9e39",
        RENTED: "#3e78c2",
        UNAVAILABLE: "#c72c2e",
        TAKEN: "#7d673e",
        UNDER_CONSTRUCTION: "#A300D8",
        UNDER_MAINTENANCE: "#E0067C",
    };

    function statusColor(params: GridCellParams) {
        if (!params.value) {
            return <></>;
        }
        const status = (params.value as string).trim();
        const statusUpper = status.toUpperCase() as PropertyStatus;
        // console.log("statusUpper:", statusUpper); // add this to debug the value
        const color = STATUS_COLORS[statusUpper] || "#537f91"; // default color if status is not recognized

        return (
            <Box
                sx={{
                    width: 150,
                    height: 30,
                    bgcolor: color,
                    color: "white",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {status}
            </Box>
        );
    }
    const columns: GridColDef[] = [
        {
            field: "propertyImage",
            headerName: "Thumbnail",
            width: 180,
            align: "center",
            headerAlign: "center",
            renderCell: renderImage,
        },
        {
            field: "code",
            headerName: "Reference ID",
            width: 180,
            headerAlign: "center",

            align: "center",
        },
        {
            field: "parentCategory",
            width: 180,
            align: "center",
            headerAlign: "center",
            headerName: "Category",
        },
        {
            field: "category",
            width: 180,
            align: "center",
            headerAlign: "center",
            headerName: "Subcategory",
        },
        {
            field: "price",
            width: 180,
            headerAlign: "center",
            align: "center",
            headerName: "Price",
            renderCell: (params: GridCellParams) => {
                return params.value ? `${params.value} €` : "";
            },
        },
        {
            field: "state",
            headerAlign: "center",
            width: 180,
            align: "center",
            headerName: "Status",
            renderCell: statusColor,
        },
        {
            field: "area",
            width: 180,
            headerAlign: "center",
            align: "center",
            headerName: "Area",
            renderCell: (params: GridCellParams) => {
                return params.value ? `${params.value} m²` : "";
            },
        },
    ];

    const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
    const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
        id: index + 1,
    }));

    const handlePaginationModelChange = (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => {
        setPageSize(model.pageSize);
        setPage(model.page);
    };

    // Bulk Edit
    const handleBulkEdit = () => setBulkEditOpen(true);
    const closeBulkEdit = () => setBulkEditOpen(false);

    // Bulk Delete
    const openBulkDeleteDialog = (selectedRows: GridRowSelectionModel) => {
        setBulkDeleteDialogOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkDeleteDialog = () => setBulkDeleteDialogOpen(false);
    const handleBulkDelete = () => {
        closeBulkDeleteDialog();
        // delete each row; By default the DataGrid looks for a property named `id` when getting the rows, so selectedRow = id
        Promise.all(selectedRows.map((id) => deleteProperty(+id))).then(() =>
            revalidate()
        );
    };

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Paper
                sx={{
                    p: 1,
                    marginRight: bulkEditOpen ? 40 : 0,
                }}
            >
                <Stack direction={"row"} flex={1} flexWrap={"wrap"}>
                    <FilterSection />
                    <Stack direction={"row"} spacing={2}>
                        <FilterSortBy
                            onSorting={(
                                sortingBy: SetStateAction<string>,
                                sortingOrder: SetStateAction<string>
                            ) => {
                                setSortingBy(sortingBy);
                                setSortingOrder(sortingOrder);
                            }}
                        />
                        <Box
                            sx={{
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ButtonGroup
                                size="small"
                                aria-label="small button group"
                            >
                                {viewOptions.map((option) => (
                                    <IconButton
                                        sx={{
                                            height: 38,
                                            width: 38,
                                            marginLeft: 1, // Add spacing here

                                            color:
                                                optionView === option.id
                                                    ? "primary.main"
                                                    : "neutral.300",
                                            border:
                                                optionView === option.id
                                                    ? "1px solid blue"
                                                    : "1px solid lightgrey",
                                        }}
                                        key={option.id}
                                        onClick={() => setOptionView(option.id)}
                                    >
                                        <option.icon />
                                    </IconButton>
                                ))}
                            </ButtonGroup>
                        </Box>
                    </Stack>
                </Stack>
                {changedPropertyFilters > 0 && (
                    <Box overflow={"auto"}>
                        <ChosenFilters />
                    </Box>
                )}
            </Paper>

            {rows && !isLoading ? (
                <>
                    {optionView === "list" && (
                        <Paper
                            sx={{ mt: 1 }}
                            style={{
                                marginRight: bulkEditOpen ? 320 : 0,
                            }}
                        >
                            <DataGridTable
                                rows={rows}
                                columns={columns}
                                sortingBy={sortingBy}
                                sortingOrder={sortingOrder}
                                page={page}
                                pageSize={pageSize}
                                totalRows={totalRows}
                                onPaginationModelChange={
                                    handlePaginationModelChange
                                }
                                onBulkDelete={openBulkDeleteDialog}
                                onBulkEdit={handleBulkEdit}
                            />
                        </Paper>
                    )}
                    {optionView === "grid" && (
                        <Paper sx={{ marginTop: 2 }}>
                            <MediaCard data={rows} />
                        </Paper>
                    )}
                    {optionView === "map" && (
                        <Paper sx={{ marginTop: 2 }}>
                            <MapView data={rows} />
                        </Paper>
                    )}
                </>
            ) : (
                <Paper sx={{ mt: 2 }}>
                    <DataGridTable
                        rows={skeletonRows}
                        columns={columns.map((column) => ({
                            ...column,
                            renderCell: renderSkeletonCell,
                        }))}
                        sortingBy={sortingBy}
                        sortingOrder={sortingOrder}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
                    />
                </Paper>
            )}

            <BulkEditDrawer open={bulkEditOpen} onClose={closeBulkEdit} />
            <DeleteDialog
                multiple
                open={bulkDeleteDialogOpen}
                onClose={closeBulkDeleteDialog}
                onDelete={handleBulkDelete}
            />
        </Box>
    );
};

export default ViewAll;
