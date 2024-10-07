// PropertyDataGrid

import { Skeleton, Stack } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";
import DataGridTable from "../DataGrid";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import GridProps from "../types";
import { getColumns } from "./columns";

interface PropertyDataGridProps extends Omit<GridProps, "rows" | "columns"> {
    rows?: GridValidRowModel[];
    skeleton?: boolean;
}

// Skeleton
const renderSkeletonCell = () => (
    <Stack justifyContent="center" alignItems="center" width={1} height={1}>
        <Skeleton width="50%" height={30} animation="wave" />
    </Stack>
);

const skeletonRows = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
}));

const DataGrid: FC<PropertyDataGridProps> = ({ skeleton, ...props }) => {
    const { t } = useTranslation();

    const columns = useMemo(() => {
        const c = getColumns(t);

        return skeleton
            ? c.map((column) => ({
                  ...column,
                  renderCell: renderSkeletonCell,
              }))
            : c;
    }, [t, skeleton]);

    const rows = skeleton ? skeletonRows : props.rows || [];

    return <DataGridTable columns={columns} {...props} rows={rows} />;
};

export default DataGrid;
