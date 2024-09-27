import { Grid, Paper } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import { useFilterCustomersQuery } from "src/services/customers";
import { selectAll } from "src/slices/customer/filters";
import DataGrid from "@/components/DataGrid/Customer";
import useResponsive from "@/hooks/useResponsive";
import CustomerCard from "@/components/Cards/CustomerCard";
import { useTranslation } from "react-i18next";
import { getOptions } from "./(FilterSection)/constants";
import Pagination, { usePagination } from "@/components/Pagination";
import Toolbar from "@/sections/DataGrids/CustomersToolbar";
import { FilterSection } from "./(FilterSection)";

const Customers: NextPage = () => {
    const { t } = useTranslation();

    const allFilters = useSelector(selectAll);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

    const { isLoading, data } = useFilterCustomersQuery({
        filter: allFilters,
        page,
        pageSize,
        sortBy,
        direction,
    });

    const rows = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

    const totalRows = useMemo(
        () => (data?.totalElements ? data?.totalElements : 0),
        [data?.totalElements]
    );

    const totalElements = data?.totalElements || pageSize;

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

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPageSize(model.pageSize);
        setPage(model.page);

        const paginationState = { page: model.page };
        localStorage.setItem(
            "customerPaginationState",
            JSON.stringify(paginationState)
        );
    };

    const belowMd = useResponsive("down", "md");

    const handlePageChange = (_: any, newPage: number) => setPage(newPage);

    return (
        <>
            <FilterSection
                sx={{
                    mb: 1,
                    position: "sticky",
                    top: 64,
                    zIndex: 2,
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                }}
                sorting={sorting}
                onSortingChange={setSorting}
            />

            {selectedRows && selectedRows.length > 0 ? (
                <Toolbar selectedRows={selectedRows} />
            ) : null}

            {belowMd ? (
                <Pagination
                    {...pagination}
                    isLoading={isLoading}
                    pageSize={pageSize}
                    page={page}
                    onChange={handlePageChange}
                    totalItems={totalElements}
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
                <Paper>
                    <DataGrid
                        skeleton={isLoading}
                        rows={rows}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationModelChange}
                        checkboxSelection
                        onRowSelectionModelChange={setSelectedRows as any}
                    />
                </Paper>
            )}
        </>
    );
};

Customers.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Customers;
