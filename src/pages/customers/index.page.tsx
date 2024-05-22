import { Box, Paper, Grid } from "@mui/material";
import { GridPaginationModel, GridRowSelectionModel } from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteDialog } from "src/components/Dialog/Delete";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import {
    useBulkDeleteCustomersMutation,
    useFilterCustomersMutation,
} from "src/services/customers";
import { selectAll } from "src/slices/customer/filters";
import FilterSection from "./FilterSection";
import { BulkEdit } from "./BulkEdit/BulkEdit";
import DataGrid from "@/components/DataGrid/Customer";
import useResponsive from "@/hooks/useResponsive";
import CustomerCard from "@/components/CustomerCard";
import { getOptions } from "./FilterSection/constants";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/Pagination";

const Customers: NextPage = () => {
    const { t } = useTranslation();

    const allFilters = useSelector(selectAll);

    const [bulkEditOpen, setBulkEditOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

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

    // page
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const [bulkDeleteCustomers] = useBulkDeleteCustomersMutation();
    const [filterCustomers, { data, isLoading }] = useFilterCustomersMutation();

    const totalRows = useMemo(
        () => (data?.totalElements ? data?.totalElements : 100000),
        [data?.totalElements]
    );

    const revalidate = () => {
        filterCustomers({
            filter: allFilters,
            page,
            pageSize,
            sortBy,
            direction,
        });
    };

    const handlePageChange = (model: GridPaginationModel) => {
        setPageSize(model.pageSize);
        setPage(model.page);
        const paginationState = { page: model.page };
        localStorage.setItem(
            "customerPaginationState",
            JSON.stringify(paginationState)
        );
    };

    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize, sortBy, direction]);

    const rows = useMemo(() => data?.content || [], [data?.content]);

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

    useLocalStorageScrollRestore();

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

    const belowMd = useResponsive("down", "md");

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
                }}
                sorting={sorting}
                onSortingChange={setSorting}
            />

            {belowMd ? (
                <Pagination
                    isLoading={isLoading}
                    page={page}
                    pageSize={pageSize}
                    totalItems={data?.totalElements ?? pageSize}
                    Container={Grid}
                    ContainerProps={{
                        container: true,
                        spacing: 2,
                    }}
                    onChange={(_, page) => handlePageChange({ pageSize, page })}
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
                        // ...
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        // ...
                        onPaginationModelChange={handlePageChange}
                        onBulkEdit={openBulkEdit}
                        onBulkDelete={openBulkDeleteDialog}
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

Customers.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Customers;
