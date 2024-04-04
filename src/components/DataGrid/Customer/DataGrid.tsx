// CustomerDataGrid

import { Skeleton } from "@mui/material";
import {
    GridCellParams,
    GridColDef,
    GridValidRowModel,
} from "@mui/x-data-grid";
import { TranslationType } from "@/types/translation";
import DataGridTable from "../DataGrid";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GridProps from "../types";
import { TypeLabels } from "@/components/TypeLabels";
import RenderLabelsCell from "../shared/RenderLabels";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function statusColor(params: GridCellParams) {
    const labels = (
        <TypeLabels
            seller={params.row.seller}
            lessor={params.row.lessor}
            leaser={params.row.leaser}
            buyer={params.row.buyer}
        />
    );

    return <div>{labels}</div>;
}

const getColumns = (t: TranslationType, isMobile: boolean): GridColDef[] => [
    {
        flex: 1,
        field: "firstName",
        headerName: t("First Name") || "",
        headerAlign: "center",
        align: "center",
    },
    {
        flex: 1,
        field: "lastName",
        headerName: t("Last Name") || "",
        headerAlign: "center",
        align: "center",
    },
    {
        flex: 1,
        field: "mobilePhone",
        headerName: t("Mobile Phone") || "",
        headerAlign: "center",
        align: "center",
    },

    {
        flex: 1,
        field: "city",
        headerName: t("City") || "",
        headerAlign: "center",
        align: "center",
    },
    {
        flex: 1,
        field: "category",
        headerAlign: "center",
        align: "center",
        headerName: t("Category") || "",
        renderCell: statusColor,
    },
    {
        width: 180,
        field: "labels",
        headerAlign: "center",
        align: "center",
        headerName: t("Labels") || "",
        renderCell: RenderLabelsCell,
    },
];

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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const columns = useMemo(() => getColumns(t, isMobile), [t, isMobile]);

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
        />
    );
};

export default DataGrid;
