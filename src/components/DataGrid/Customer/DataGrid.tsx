// CustomerDataGrid

import { Skeleton } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataGridTable from "../DataGrid";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GridProps from "../types";
import getColumns from "./columns";

interface CustomerDataGridProps extends Omit<GridProps, "rows" | "columns"> {
    rows?: GridValidRowModel[];
    skeleton?: boolean;
}

// Skeleton
const renderSkeletonCell = () => <Skeleton width={150} animation="wave" />;
const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
}));

const DataGrid = ({ skeleton, ...props }: CustomerDataGridProps) => {
    const { t } = useTranslation();

    const columns = useMemo(() => getColumns(t), [t]);

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
            resource="customer"
            disableColumnMenu
        />
    );
};

export default DataGrid;
