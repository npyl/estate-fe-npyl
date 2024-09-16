import { Paper } from "@mui/material";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import useLocalStorageScrollRestore from "src/hooks/useLocalStorageScrollRestore";
import { useFilterPropertiesQuery } from "src/services/properties";
import { selectAll } from "src/slices/filters";
import DataGrid from "@/components/DataGrid/Property";
import Toolbar from "../../../sections/DataGrids/PropertiesToolbar";

interface ViewAllProps {
    sortBy: string;
    direction: string;
}

const ViewAll = ({ sortBy, direction }: ViewAllProps) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    // Pagination
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(25);

    const allFilters = useSelector(selectAll);

    const { data, isLoading } = useFilterPropertiesQuery({
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

    const totalRows = data?.totalElements || 10;

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

    const handlePaginationChange = (model: GridPaginationModel) => {
        setPageSize(model.pageSize);
        setPage(model.page);

        const paginationState = { page: model.page };
        localStorage.setItem(
            "propertyPaginationState",
            JSON.stringify(paginationState)
        );
    };

    return (
        <>
            {selectedRows && selectedRows.length > 0 ? (
                <Toolbar selectedRows={selectedRows} />
            ) : null}

            <Paper>
                {rows && !isLoading ? (
                    <DataGrid
                        rows={rows}
                        page={page}
                        pageSize={pageSize}
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationChange}
                        checkboxSelection
                        onRowSelectionModelChange={setSelectedRows as any}
                        disableColumnMenu
                    />
                ) : (
                    <DataGrid
                        skeleton
                        page={page}
                        pageSize={pageSize}
                        checkboxSelection
                        totalRows={totalRows}
                        onPaginationModelChange={handlePaginationChange}
                        disableColumnMenu
                    />
                )}
            </Paper>
        </>
    );
};

export default ViewAll;
