import DataGridTable from "../DataGrid";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import GridProps from "../types";
import { getColumns } from "./columns";

type PropertyDataGridProps = Omit<GridProps, "columns">;

const DataGrid: FC<PropertyDataGridProps> = (props) => {
    const { t } = useTranslation();
    const columns = useMemo(() => getColumns(t), [t]);
    return <DataGridTable columns={columns} {...props} />;
};

export default DataGrid;
