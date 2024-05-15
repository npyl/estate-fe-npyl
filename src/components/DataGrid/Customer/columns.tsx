import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { TranslationType } from "@/types/translation";
import { TypeLabels } from "@/components/TypeLabels";
import RenderLabelsCell from "../shared/RenderLabels";
import Typography from "@mui/material/Typography";

const StatusColor = ({ row }: GridCellParams) => (
    <TypeLabels
        forceTruncate
        seller={row.seller}
        lessor={row.lessor}
        leaser={row.leaser}
        buyer={row.buyer}
    />
);

const PriceRangeCell = ({ row }: GridCellParams) => {
    if (!row.price?.[0] || !row.price?.[1]) return null;

    return <Typography>{`${row.price[0]} - ${row.price[1]} €`}</Typography>;
};

const getColumns = (t: TranslationType): GridColDef[] => [
    {
        flex: 1,
        field: "firstName",
        headerName: t("First Name").toString(),
        headerAlign: "center",
        align: "center",
    },
    {
        flex: 1,
        field: "lastName",
        headerName: t("Last Name").toString(),
        headerAlign: "center",
        align: "center",
    },
    {
        flex: 1,
        field: "mobilePhone",
        headerName: t("Mobile Phone").toString(),
        headerAlign: "center",
        align: "center",
    },

    {
        flex: 1,
        field: "priceRange",
        headerName: t("Price").toString(),
        headerAlign: "center",
        align: "center",
        renderCell: PriceRangeCell,
    },
    {
        flex: 1,
        field: "area",
        headerName: t("Area").toString(),
        headerAlign: "center",
        align: "center",
    },
    {
        flex: 1,
        field: "createdAt",
        headerName: t("Date of Entry").toString(),
        headerAlign: "center",
        align: "center",
    },
    {
        flex: 1,
        field: "category",
        headerAlign: "center",
        align: "center",
        headerName: t("_SubCategory").toString(),
        renderCell: StatusColor,
    },
    {
        width: 180,
        field: "labels",
        headerAlign: "center",
        align: "center",
        headerName: t("Labels").toString(),
        renderCell: RenderLabelsCell,
    },
];

export default getColumns;
