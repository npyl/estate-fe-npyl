import { Paper } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import DataGrid from "@/components/DataGrid/Property";
import dynamic from "next/dynamic";
import useFilteredRows from "./useFilteredRows";
import { IPropertyFilterParams } from "@/services/properties";
import { useRouter } from "next/router";
import { useAllFilters, useFiltersContext } from "../FiltersContext";
import { toNumberSafe } from "@/utils/toNumber";
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

    const router = useRouter();
    const { assignee } = router.query; // Read assignee from query param

    const { setManagerId } = useFiltersContext();
    const filter = useAllFilters();

    // **Effect to update Redux store with managerId when URL changes**
    useEffect(() => {
        if (assignee) {
            const iManagerId = toNumberSafe(assignee);
            setManagerId(iManagerId);
        }
    }, [assignee]);

    const req: IPropertyFilterParams = {
        filter,
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
            const parsedPagination = JSON.parseSafe(storedPagination);
            if (!parsedPagination) return;

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
                <Toolbar
                    archived={archived}
                    selectedRows={selectedRows}
                    filters={req}
                />
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
                    disableColumnSorting={false}
                />
            </Paper>
        </>
    );
};

export default ViewAll;
