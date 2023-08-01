import {
    GridCallbackDetails,
    GridColDef,
    GridPaginationModel,
    GridRowSelectionModel,
    GridRowsProp,
    GridSortDirection,
    GridSortModel,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { FC, useMemo, useState } from "react";
import { addTab } from "src/slices/tabs";
import { useDispatch } from "src/store";
import { StyledDataGrid } from "./styles";
import { IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

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

    onBulkEdit?: () => void;

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

    onBulkEdit,

    resource = "property",
}) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>();
    const [sortModel, setSortModel] = useState<GridSortModel>([]);

    useMemo(() => {
        setSortModel([
            { field: sortingBy || "", sort: sortingOrder as GridSortDirection },
        ]);
    }, [sortingBy, sortingOrder]);

    const BulkEditButton = () => (
        <IconButton
            onClick={onBulkEdit}
            sx={{ position: "absolute", right: 0, mr: 1, mt: 0.5 }}
        >
            <EditNoteIcon />
        </IconButton>
    );

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarExport />

                {selectedRows && selectedRows.length > 0 && <BulkEditButton />}
            </GridToolbarContainer>
        );
    };

    const handleSortChange = (newSortModel: any) => {
        setSortModel(newSortModel);
    };

    const handleRowSelectionChange = (
        model: GridRowSelectionModel,
        details: GridCallbackDetails<any>
    ) => {
        setSelectedRows(model);
    };

    return (
        <>
            <StyledDataGrid
                slots={{
                    toolbar: CustomToolbar,
                }}
                localeText={{
                    toolbarColumns: "Fields",
                    columnsPanelTextFieldLabel: "Search Field",
                    columnsPanelTextFieldPlaceholder: "Name of Fields",
                }}
                sx={{
                    "& .MuiDataGrid-row": {
                        cursor: "pointer",
                    },
                }}
                // --- selection ---
                onRowSelectionModelChange={handleRowSelectionChange}
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
            />
        </>
    );
};

export default DataGridTable;
