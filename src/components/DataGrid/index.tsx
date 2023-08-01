import {
    GridCallbackDetails,
    GridColDef,
    GridPaginationModel,
    GridRowsProp,
    GridSortDirection,
    GridSortModel,
    GridToolbar,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { addTab } from "src/slices/tabs";
import { useDispatch } from "src/store";
import { StyledDataGrid } from "./styles";

type GridProps = {
    rows: GridRowsProp;
    columns: GridColDef[];

    sortingBy: string | null;
    sortingOrder: string | null;

    page: number;
    pageSize: number;
    totalRows?: number;
    onPaginationModelChange?: (
        model: GridPaginationModel,
        details: GridCallbackDetails
    ) => void;

    resource?: string;
};

const DataGridTable: FC<GridProps> = ({
    rows,
    columns,

    sortingBy,
    sortingOrder,

    page,
    pageSize,
    totalRows,
    onPaginationModelChange,

    resource = "property",
}) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    const handleSortChange = (newSortModel: any) => {
        setSortModel(newSortModel);
    };

    useMemo(() => {
        setSortModel([
            { field: sortingBy || "", sort: sortingOrder as GridSortDirection },
        ]);
    }, [sortingBy, sortingOrder]);

    return (
        <>
            <StyledDataGrid
                slots={{
                    toolbar: GridToolbar,
                }}
                localeText={{
                    toolbarColumns: "Fields",
                    columnsPanelTextFieldLabel: "Search Field",
                    columnsPanelTextFieldPlaceholder: "Name of Fieldss",
                }}
                sx={{
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                    },
                }}
                // --- pagination ---
                paginationMode="server"
                rowCount={totalRows}
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={onPaginationModelChange}
                // ------------------
                disableColumnFilter
                disableDensitySelector
                rowHeight={100}
                getRowId={(e) => e.id}
                onRowClick={(e) => {
                    router.push(`/${resource}/${e.row.id}`);
                    dispatch(
                        addTab({
                            title: `${resource} ${e.row.id}`,
                            path: `/${resource}/${e.row.id}`,
                        })
                    );
                }}
                checkboxSelection
                autoHeight
                disableRowSelectionOnClick
                sortModel={sortModel}
                onSortModelChange={handleSortChange}
                rows={rows}
                columns={columns}
                pageSizeOptions={[25, 50, 100]}
            />
        </>
    );
};

export default DataGridTable;
