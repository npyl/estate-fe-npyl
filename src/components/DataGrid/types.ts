import { DataGridProps, GridColDef, GridRowsProp } from "@mui/x-data-grid";

type GridProps = {
    rows: GridRowsProp;
    columns: GridColDef[];

    page: number;
    pageSize: number;
    totalRows?: number;

    resource?: string;
} & Omit<DataGridProps, "sortingOrder">;

export default GridProps;
