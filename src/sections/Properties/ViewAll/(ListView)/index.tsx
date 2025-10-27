import { GridPaginationModel } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import DataGrid from "@/ui/DataGrids/Property";
import dynamic from "next/dynamic";
import useFilteredRows from "./useFilteredRows";
import { IPropertyFilterParams } from "@/services/properties";
import { useAllFilters } from "../../FiltersContext";
import JSONParseSafe from "@/utils/JSONParseSafe";
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

    const filter = useAllFilters();

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
            const parsedPagination = JSONParseSafe<any>(storedPagination);
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
        </>
    );
};

export default ViewAll;
