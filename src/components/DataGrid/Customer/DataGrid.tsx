import DataGridTable from "../DataGrid";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import GridProps from "../types";
import getColumns from "./columns";

type CustomerDataGridProps = Omit<GridProps, "columns" | "resource">;

const DataGrid: FC<CustomerDataGridProps> = (props) => {
    const { t } = useTranslation();
    const columns = useMemo(() => getColumns(t), [t]);
    return (
        <DataGridTable
            columns={columns}
            resource="customer"
            disableColumnMenu
            {...props}
        />
    );
};

export default DataGrid;
