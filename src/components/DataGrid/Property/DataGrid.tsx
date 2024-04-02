// PropertyDataGrid

import { Skeleton } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataGridTable from "../DataGrid";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GridProps from "../types";
import { getColumns, getSmallColumns } from "./columns";

interface PropertyDataGridProps extends Omit<GridProps, "rows" | "columns"> {
    rows?: GridValidRowModel[];
    columnVariant?: "default" | "small";
    skeleton?: boolean;
}

// Skeleton
const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
}));

const DataGrid = ({
    skeleton,
    columnVariant = "default",
    ...props
}: PropertyDataGridProps) => {
    const { t } = useTranslation();

    const columns = useMemo(
        () =>
            columnVariant === "default"
                ? getColumns(t)
                : columnVariant === "small"
                ? getSmallColumns(t)
                : [],
        [t]
    );

    return (
        <DataGridTable
            columns={
                skeleton
                    ? columns.map((column) => ({
                          ...column,
                          renderCell: renderSkeletonCell,
                      }))
                    : columns
            }
            {...props}
            rows={skeleton ? skeletonRows : props.rows || []}
        />
    );
};

export default DataGrid;
