import { Box, Paper, Skeleton } from "@mui/material";
import {
    GridCallbackDetails,
    GridCellParams,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DataGridTable from "src/components/DataGrid";
import { DeleteDialog } from "src/components/Dialog/Delete";
import ListLabelsItem from "src/components/List/labels-item";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import {
    useBulkDeleteCustomersMutation,
    useFilterCustomersMutation,
} from "src/services/customers";
import { selectAll } from "src/slices/customer/filters";
import { ILabel } from "src/types/label";
import { FilterSection } from "./components";
import { BulkEdit } from "./components/BulkEdit/BulkEdit";
import { TypeLabels } from "./components/TypeLabels";

const Customers: NextPage = () => {
    const { t } = useTranslation();

    const allFilters = useSelector(selectAll);

    const [bulkEditOpen, setBulkEditOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [sortingOrder, setSortingOrder] = useState("asc");
    // page
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const [bulkDeleteCustomers] = useBulkDeleteCustomersMutation();
    const [filterCustomers, { data }] = useFilterCustomersMutation();

    const totalRows = useMemo(
        () => (data?.totalElements ? data?.totalElements : 100000),
        [data?.totalElements]
    );

    const revalidate = () => {
        filterCustomers({
            filter: allFilters,
            page: page,
            pageSize: pageSize,
        });
    };

    function showLabel(params: GridCellParams) {
        if (!params.value || !Array.isArray(params.value)) return <></>;

        const labels: ILabel[] = params.value as ILabel[];

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ListLabelsItem labels={labels} label={""} />
            </div>
        );
    }
    const handlePaginationModelChange = (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => {
        setPageSize(model.pageSize);
        setPage(model.page);
        const paginationState = { page: model.page };
        localStorage.setItem(
            "customerPaginationState",
            JSON.stringify(paginationState)
        );
    };
    function statusColor(params: GridCellParams) {
        const labels = (
            <TypeLabels
                seller={params.row.seller}
                lessor={params.row.lessor}
                leaser={params.row.leaser}
                buyer={params.row.buyer}
            />
        );

        return <div>{labels}</div>;
    }

    const columns: GridColDef[] = [
        // {
        //     field: "image",
        //     headerName: "",
        //     renderCell: (params: GridCellParams) => {
        //         const firstName = params.row.firstName;
        //         const lastName = params.row.lastName;

        //         return (firstName && lastName) || firstName || lastName ? (
        //             <Avatar>
        //                 {firstName[0]}
        //                 {lastName[0]}
        //             </Avatar>
        //         ) : (
        //             <Avatar>
        //                 <UserCircle />
        //             </Avatar>
        //         );
        //     },
        // },

        {
            flex: 1,
            field: "firstName",
            headerName: t("First Name") || "",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 1,
            field: "lastName",
            headerName: t("Last Name") || "",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 1,
            field: "mobilePhone",
            headerName: t("Mobile Phone") || "",
            headerAlign: "center",
            align: "center",
        },

        {
            flex: 1,
            field: "city",
            headerName: t("City") || "",
            headerAlign: "center",
            align: "center",
        },
        {
            flex: 1,
            field: "category",
            headerAlign: "center",
            align: "center",
            headerName: t("Category") || "",
            renderCell: statusColor,
        },
        {
            width: 180,
            field: "labels",
            headerAlign: "center",
            align: "center",
            headerName: t("Labels") || "",
            renderCell: showLabel,
        },
    ];

    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize]);

    const rows = useMemo(() => data?.content || [], [data?.content]);

    const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
    const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
        id: index + 1,
    }));

    const openBulkDeleteDialog = (selectedRows: GridRowSelectionModel) => {
        setBulkDeleteDialogOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkDeleteDialog = () => setBulkDeleteDialogOpen(false);
    const handleBulkDelete = () => {
        closeBulkDeleteDialog();
        // INFO: bulk delete rows; By default the DataGrid looks for a customer named `id` when getting the rows, so selectedRow = id
        bulkDeleteCustomers(selectedRows.map((row) => +row)).then(() =>
            revalidate()
        );
    };

    const openBulkEdit = (selectedRows: GridRowSelectionModel) => {
        setBulkEditOpen(true);
        setSelectedRows(selectedRows);
    };
    const closeBulkEdit = () => setBulkEditOpen(false);
    const handleBulkEditSave = () => revalidate();
    const observerRef = useLocalStorageScrollRestore();
    useEffect(() => {
        const storedPagination = localStorage.getItem(
            "customerPaginationState"
        );

        if (storedPagination !== null) {
            const parsedPagination = JSON.parse(storedPagination);
            // Now you can work with the parsed data.
            if (page !== parsedPagination.page) {
                setPage(parsedPagination.page);
            }
        }
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
                height: "100%", // WARN: make sure height is full so that bulk edit is full even if DataGrid is small
            }}
        >
            <FilterSection
                sx={{
                    marginRight: bulkEditOpen ? 40 : 0,
                }}
            />

            <Paper sx={{ mt: 1, marginRight: bulkEditOpen ? 40 : 0 }}>
                {rows ? (
                    <DataGridTable
                        rows={rows}
                        columns={columns}
                        resource={"customer"}
                        sortingBy={"firstName"}
                        sortingOrder={sortingOrder}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
                        onBulkEdit={openBulkEdit}
                        onBulkDelete={openBulkDeleteDialog}
                    />
                ) : (
                    <DataGridTable
                        rows={skeletonRows}
                        columns={columns.map((column) => ({
                            ...column,
                            renderCell: renderSkeletonCell,
                        }))}
                        sortingBy={""}
                        sortingOrder={sortingOrder}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
                    />
                )}
            </Paper>

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

Customers.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Customers;
