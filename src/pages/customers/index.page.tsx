import { Box, Button, Grid, Paper } from "@mui/material";
import {
    GridCallbackDetails,
    GridPaginationModel,
    GridRowSelectionModel,
} from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import DeleteDialog from "src/components/Dialog/Delete";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import {
    useBulkDeleteCustomersMutation,
    useFilterCustomersMutation,
} from "src/services/customers";
import { selectAll } from "src/slices/customer/filters";
import DataGrid from "@/components/DataGrid/Customer";
import useResponsive from "@/hooks/useResponsive";
import CustomerCard from "@/components/CustomerCard";
import { useTranslation } from "react-i18next";
import FilterSection from "./(FilterSection)";
import { getOptions } from "./(FilterSection)/constants";
import BulkEdit from "./(BulkEdit)";
import Pagination, { usePagination } from "@/components/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";

const Customers: NextPage = () => {
    const { t } = useTranslation();

    const allFilters = useSelector(selectAll);

    const [bulkEditOpen, setBulkEditOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);
    const pagination = usePagination();
    const sortingOptions = useMemo(() => getOptions(t), [t]);
    const [sorting, setSorting] = useState("default");
    const { sortBy, direction } = useMemo(
        () =>
            sortingOptions.find(({ value }) => value === sorting)?.sorting || {
                sortBy: "updatedAt",
                direction: "DESC",
            },
        [sortingOptions, sorting]
    );

    const [bulkDeleteCustomers] = useBulkDeleteCustomersMutation();
    const [filterCustomers, { isLoading, data }] = useFilterCustomersMutation();

    const revalidate = () => {
        filterCustomers({
            filter: allFilters,
            page,
            pageSize,
            sortBy,
            direction,
        });
    };

    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize, sortBy, direction]);

    const rows = useMemo(() => data?.content || [], [data?.content]);
    const totalRows = useMemo(
        () => (data?.totalElements ? data?.totalElements : 0),
        [data?.totalElements]
    );

    useLocalStorageScrollRestore();

    useEffect(() => {
        const storedPagination = localStorage.getItem(
            "customerPaginationState"
        );

        if (storedPagination) {
            const parsedPagination = JSON.parse(storedPagination);
            if (page !== parsedPagination.page) {
                setPage(parsedPagination.page);
            }
        }
    }, []);

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

    // Bulk Edit
    const handleBulkEdit = (selectedRows: GridRowSelectionModel) => {
        setBulkEditOpen(true);
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
        try {
            bulkDeleteCustomers(selectedRows.map((row) => +row)).unwrap();
            setSelectedRows([]); // Clear selection
            revalidate(); // Revalidate to refresh the datagrid
        } catch (error) {
            console.error("Failed to delete customers:", error);
        }
    };

    const handleRowSelectionModelChange = (
        selectionModel: GridRowSelectionModel
    ) => {
        setSelectedRows(selectionModel);
    };

    const belowMd = useResponsive("down", "md");

    const handlePageChange = (_: any, newPage: number) => {
        setPage(newPage);
    };

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
                    mb: 1,
                    position: "sticky",
                    top: 64,
                    zIndex: 2,
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                }}
                sorting={sorting}
                onSortingChange={setSorting}
            />
            <Box display="flex" justifyContent="flex-end" p={1}>
                {selectedRows && selectedRows.length > 0 ? (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleBulkDelete}
                        startIcon={<DeleteIcon />}
                    >
                        {t("Delete")}
                    </Button>
                ) : null}
            </Box>
            {belowMd ? (
                <Pagination
                    {...pagination}
                    isLoading={isLoading}
                    pageSize={pageSize}
                    page={page}
                    onChange={handlePageChange}
                    totalItems={data?.totalElements ?? pageSize}
                    Container={Grid}
                    ContainerProps={{
                        container: true,
                        spacing: 2,
                    }}
                >
                    {rows.map((c, i) => (
                        <Grid item key={i} xs={12} sm={6}>
                            <CustomerCard c={c} />
                        </Grid>
                    ))}
                </Pagination>
            ) : (
                <Paper sx={{ marginRight: bulkEditOpen ? 40 : 0 }}>
                    <DataGrid
                        skeleton={isLoading}
                        rows={rows}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
                        onBulkEdit={handleBulkEdit}
                        onBulkDelete={openBulkDeleteDialog}
                        checkboxSelection
                        onRowSelectionModelChange={
                            handleRowSelectionModelChange
                        }
                    />
                </Paper>
            )}

            <BulkEdit
                open={bulkEditOpen}
                selectedIds={selectedRows.map((row) => +row)}
                onSave={handleBulkEditSave}
                onClose={() => setBulkEditOpen(false)}
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
