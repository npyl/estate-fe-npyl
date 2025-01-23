import { Paper } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import { selectAll } from "src/slices/filters";
import DataGrid from "@/components/DataGrid/Property";
import dynamic from "next/dynamic";
import useFilteredRows from "./useFilteredRows";
const Toolbar = dynamic(() => import("@/sections/DataGrids/PropertiesToolbar"));

interface ViewAllProps {
    archived?: boolean;
    sortBy: string;
    direction: string;
}

const ViewAll = ({ archived = false, sortBy, direction }: ViewAllProps) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const allFilters = useSelector(selectAll);

    const req = {
        filter: allFilters,
        page,
        pageSize,
        sortBy,
        direction,
    };

    const { rows, totalRows, isLoading } = useFilteredRows(archived, req);

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

    const handlePaginationChange = useCallback((model: GridPaginationModel) => {
        setPageSize(model.pageSize);
        setPage(model.page);

        const paginationState = { page: model.page };
        localStorage.setItem(
            "propertyPaginationState",
            JSON.stringify(paginationState)
        );
    }, []);

    return (
        <>
            {selectedRows && selectedRows.length > 0 ? (
                <Toolbar archived={archived} selectedRows={selectedRows} />
            ) : null}

            <Paper>
                <DataGrid
                    loading={isLoading}
                    resource={archived ? "archived" : "property"}
                    rows={rows || []}
                    page={page}
                    pageSize={pageSize}
                    totalRows={totalRows}
                    onPaginationModelChange={handlePaginationChange}
                    checkboxSelection
                    onRowSelectionModelChange={setSelectedRows as any}
                    disableColumnMenu
                />
            </Paper>
        </>
    );
};

export default ViewAll;
