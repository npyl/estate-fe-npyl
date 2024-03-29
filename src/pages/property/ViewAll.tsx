import {
    Box,
    Chip,
    ChipProps,
    Grid,
    Paper,
    Popper,
    Skeleton,
    Stack,
    IconButton,
} from "@mui/material";
import {
    GridCallbackDetails,
    GridCellParams,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DeleteDialog } from "src/components/Dialog/Delete";
import Image from "src/components/image";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import {
    useBulkDeletePropertiesMutation,
    useFilterPropertiesMutation,
} from "src/services/properties";
import { selectAll } from "src/slices/filters";
import { KeyValue } from "src/types/KeyValue";
import { ILabel } from "src/types/label";
import DataGridTable from "../../components/DataGrid";
import { BulkEdit } from "../components/BulkEdit/BulkEdit";
import { Label } from "src/components/label";
import { styled } from "@mui/material/styles";
import getBorderColor from "src/theme/borderColor";
import { Close } from "@mui/icons-material";

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

const StyledChip = styled(Chip)(({ theme }) => ({
    width: "min-content",
    height: "min-content",
    paddingTop: theme.spacing(0.4),
    paddingBottom: theme.spacing(0.4),

    backgroundColor: `${getBorderColor(theme)} !important`,
    "&:hover": {
        backgroundColor: `${theme.palette.action.focus} !important`,
    },
}));

interface MoreChipProps extends ChipProps {
    labels: ILabel[];
}

const MoreChip = ({ labels, ...props }: MoreChipProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const handleOpen = useCallback((e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    }, []);
    const handleClose = useCallback(() => setAnchorEl(null), []);

    return (
        <>
            <StyledChip {...props} onClick={handleOpen} />

            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Paper
                    sx={{
                        p: 2,
                        width: "300px",
                    }}
                >
                    <Stack alignItems="flex-end">
                        <IconButton onClick={handleClose}>
                            <Close />
                        </IconButton>
                    </Stack>
                    <Grid container>
                        {labels.map(({ id, name, color }) => (
                            <Grid
                                item
                                xs={6}
                                key={id}
                                sx={{
                                    overflowX: "hidden",
                                }}
                            >
                                <Label
                                    sx={{
                                        bgcolor: color,
                                    }}
                                >
                                    {name}
                                </Label>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Popper>
        </>
    );
};

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

            {more > 0 ? (
                <MoreChip label={`+${more} labels`} labels={labels} />
            ) : null}
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

interface ViewAllProps {
    sortingBy: string;
    sortingOrder: string;
    // ...
    isBulkEditOpen: boolean;
    onBulkEditOpen: VoidFunction;
    onBulkEditClose: VoidFunction;
}

const ViewAll = ({
    sortingBy,
    sortingOrder,
    // ...
    isBulkEditOpen,
    onBulkEditOpen,
    onBulkEditClose,
}: ViewAllProps) => {
    const { t } = useTranslation();

    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    // pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

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
        onBulkEditOpen();
        setSelectedRows(selectedRows);
    };

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
            {rows && !isLoading ? (
                <>
                    <Paper
                        sx={{ mt: 1 }}
                        style={{
                            marginRight: isBulkEditOpen ? 320 : 0,
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
                open={isBulkEditOpen}
                selectedIds={selectedRows.map((row) => +row)}
                onSave={handleBulkEditSave}
                onClose={onBulkEditClose}
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
