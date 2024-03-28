import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import {
    Box,
    ButtonGroup,
    Chip,
    Paper,
    Skeleton,
    Stack,
    SvgIconTypeMap,
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
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DeleteDialog } from "src/components/Dialog/Delete";
import ListLabelsItem from "src/components/List/labels-item";
import Image from "src/components/image";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import { Menu } from "src/icons/menu";
import {
    useBulkDeletePropertiesMutation,
    useFilterPropertiesMutation,
} from "src/services/properties";
import { selectAll, sumOfChangedProperties } from "src/slices/filters";
import { KeyValue } from "src/types/KeyValue";
import { ILabel } from "src/types/label";
import DataGridTable from "../../components/DataGrid";
import { BulkEdit } from "./BulkEdit/BulkEdit";
import { FilterSection } from "./Filters";
import ChosenFilters from "./Filters/ChosenFilters";
import FilterSortBy from "./Filters/FilterSortBy";
import MapView from "./MapView";
import MediaCard from "./MediaCard";
import { ViewModeButton } from "./styles";
import { Label } from "src/components/label";
import { styled } from "@mui/material/styles";
import getBorderColor from "src/theme/borderColor";

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

const defaultImage = "/static/noImage.png";

function renderImage(params: GridCellParams) {
    if (params.formattedValue) {
        return (
            <>
                <Image
                    src={`${params.formattedValue}` || ""}
                    alt=""
                    ratio="16/9"
                />
            </>
        );
    } else {
        return (
            <Image
                src={defaultImage} // Make sure 'defaultImage' is imported or defined in your file
                alt="Default image description"
                ratio="16/9"
            />
        );
    }
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
    if (!params.value) return <></>;

    const value = params.value as KeyValue;
    const status = (value.value as string)?.trim();

    if (!value || !status) return <></>;

    const statusForColor = (value.key as string)?.trim();
    const statusUpper = statusForColor?.toUpperCase() as PropertyStatus;

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

const MoreChip = styled(Chip)(({ theme }) => ({
    width: "min-content",
    height: "min-content",
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),

    backgroundColor: `${getBorderColor(theme)} !important`,
    "&:hover": {
        backgroundColor: `${theme.palette.action.focus} !important`,
    },
}));

function showLabel(params: GridCellParams) {
    if (!params.value || !Array.isArray(params.value)) return <></>;

    const labels: ILabel[] = params.value as ILabel[];

    const more = labels.slice(2).length;

    return (
        <Stack spacing={0.5} alignItems="center">
            {labels.slice(0, 2).map(({ id, color, name }) => (
                <Label key={id} sx={{ bgcolor: color }}>
                    {name}
                </Label>
            ))}

            {more > 0 ? <MoreChip label={`+${more} labels`} /> : null}
        </Stack>
    );
}

//format value number with dots
const formatNumberWithPeriod = (num: any) => {
    if (num === null || num === undefined) {
        return "";
    }
    const numericValue = num.toString().replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const ViewAll: FC = () => {
    const { t } = useTranslation();

    const [bulkEditOpen, setBulkEditOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    const changedPropertyFilters = useSelector(sumOfChangedProperties);

    // sorting
    const [sortingBy, setSortingBy] = useState("updatedAt");
    const [sortingOrder, setSortingOrder] = useState("desc");
    // pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    // view
    const [optionView, setOptionView] = useState<optionType>("list");

    const allFilters = useSelector(selectAll);

    const [bulkDeleteProperties] = useBulkDeletePropertiesMutation();
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

    useLocalStorageScrollRestore();

    useEffect(() => {
        const storedPagination = localStorage.getItem(
            "propertyPaginationState"
        );

        if (storedPagination) {
            const parsedPagination = JSON.parse(storedPagination);
            if (page !== parsedPagination.page) {
                setPage(parsedPagination.page);
            }
        }
    }, []);

    const columns: GridColDef[] = [
        {
            field: "propertyImage",
            headerName: t("Thumbnail") as string,
            flex: 1,
            align: "center",
            headerAlign: "center",
            renderCell: renderImage,
        },
        {
            field: "code",
            headerName: t("Code") as string,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "parentCategory",
            flex: 1,
            align: "center",
            headerAlign: "center",
            headerName: t("Parent Category") as string,
            renderCell: (params) => (params.value as KeyValue)?.value,
        },
        {
            field: "category",
            flex: 1,
            align: "center",
            headerAlign: "center",
            headerName: t("Category") as string,
            renderCell: (params) => (params.value as KeyValue)?.value,
        },
        {
            field: "price",
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerName: t("Price") as string,
            renderCell: (params: GridCellParams) => {
                const formattedPrice = formatNumberWithPeriod(params.value);
                return formattedPrice ? `${formattedPrice} €` : "";
            },
        },
        {
            field: "state",
            headerAlign: "center",
            flex: 1,
            align: "center",
            headerName: t("State") as string,
            renderCell: statusColor,
        },
        {
            field: "area",
            flex: 1,
            headerAlign: "center",
            align: "center",
            headerName: t("Area") as string,
            renderCell: (params: GridCellParams) => {
                return params.value ? `${params.value} m²` : "";
            },
        },
        {
            field: "labels",
            headerAlign: "center",
            flex: 1,
            align: "center",
            headerName: t("Labels") as string,
            renderCell: showLabel,
        },
        {
            field: "createdAt",
            headerAlign: "center",
            flex: 1,
            align: "center",
            headerName: t("Creation Date") as string,
            renderCell: (params) => new Date(params.value).toDateString(),
        },
        {
            field: "updatedAt",
            headerAlign: "center",
            flex: 1,
            align: "center",
            headerName: t("Updated At") as string,
            renderCell: (params) => new Date(params.value).toDateString(),
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
        const paginationState = { page: model.page };
        localStorage.setItem(
            "propertyPaginationState",
            JSON.stringify(paginationState)
        );
    };

    // Bulk Edit
    const handleBulkEdit = (selectedRows: GridRowSelectionModel) => {
        setBulkEditOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkEdit = () => setBulkEditOpen(false);
    const handleBulkEditSave = () => revalidate();

    // Bulk Delete
    const openBulkDeleteDialog = (selectedRows: GridRowSelectionModel) => {
        setBulkDeleteDialogOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkDeleteDialog = () => setBulkDeleteDialogOpen(false);
    const handleBulkDelete = () => {
        closeBulkDeleteDialog();
        // INFO: bulk delete rows; By default the DataGrid looks for a property named `id` when getting the rows, so selectedRow = id
        bulkDeleteProperties(selectedRows.map((row) => +row)).then(() =>
            revalidate()
        );
    };

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
                    marginRight: bulkEditOpen ? 40 : 0,
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
                            <MapView />
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

            <BulkEdit
                open={bulkEditOpen}
                selectedIds={selectedRows.map((row) => +row)}
                onSave={handleBulkEditSave}
                onClose={closeBulkEdit}
            />
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
