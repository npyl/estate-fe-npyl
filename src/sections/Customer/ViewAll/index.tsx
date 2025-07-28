import Grid from "@mui/material/Unstable_Grid2";
import { GridPaginationModel } from "@mui/x-data-grid";
import { FC, useEffect, useMemo, useState } from "react";
import useLocalStorageScrollRestore from "@/hooks/useLocalStorageScrollRestore";
import { useFilterCustomersQuery } from "@/services/customers";
import DataGrid from "@/components/DataGrid/Customer";
import useResponsive from "@/hooks/useResponsive";
import CustomerCard from "@/ui/Cards/CustomerCard";
import { useTranslation } from "react-i18next";
import { getOptions } from "./(FilterSection)/constants";
import Pagination, { usePagination } from "@/components/Pagination";
import Toolbar from "@/sections/DataGrids/CustomersToolbar";
import { FilterSection } from "./(FilterSection)";
import {
    FiltersProvider,
    useSelectAll,
    useSorting,
} from "./(FilterSection)/Context";

interface Props {
    b2b?: boolean;
}

const CustomersViewAll: FC<Props> = ({ b2b = false }) => {
    const { t } = useTranslation();

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const pagination = usePagination();

    const sortingOptions = useMemo(() => getOptions(t), [t]);

    const sorting = useSorting();

    const { sortBy, direction } = useMemo(
        () =>
            sortingOptions.find(({ value }) => value === sorting)?.sorting || {
                sortBy: "updatedAt",
                direction: "DESC",
            },
        [sortingOptions, sorting]
    );

    const filters = useSelectAll();
    const { isLoading, data } = useFilterCustomersQuery({
        filter: { ...filters, b2b },
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
            const parsedPagination = JSON.parseSafe(storedPagination);
            if (!parsedPagination) return;

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
            <FilterSection sorting={sorting} />

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
                >
                    <Grid container spacing={1}>
                        {rows.map((c) => (
                            <Grid key={c.id} xs={12} sm={6}>
                                <CustomerCard c={c} />
                            </Grid>
                        ))}
                    </Grid>
                </Pagination>
            ) : (
                <DataGrid
                    b2b={b2b}
                    loading={isLoading}
                    rows={rows}
                    page={page}
                    pageSize={pageSize}
                    totalRows={totalRows}
                    onPaginationModelChange={handlePaginationModelChange}
                    checkboxSelection
                    onRowSelectionModelChange={setSelectedRows as any}
                />
            )}
        </>
    );
};

const Wrapped: FC<Props> = (props) => (
    <FiltersProvider b2b={props.b2b}>
        <CustomersViewAll {...props} />
    </FiltersProvider>
);

export default Wrapped;
