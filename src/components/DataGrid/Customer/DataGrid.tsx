import DataGridTable from "../DataGrid";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import GridProps from "../types";
import getColumns from "./columns";

type CustomerDataGridProps = Omit<GridProps, "columns" | "resource"> & {
    b2b?: boolean;
};

const DataGrid: FC<CustomerDataGridProps> = ({ b2b = false, ...props }) => {
    const { t } = useTranslation();
    const resource = b2b ? "customerb2b" : "customer";
    const columns = useMemo(() => getColumns(t), [t]);
    return (
        <DataGridTable
            resource={resource}
            columns={columns}
            disableColumnMenu
            {...props}
        />
    );
};

export default DataGrid;
