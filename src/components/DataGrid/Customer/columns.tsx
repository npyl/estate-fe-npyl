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

const formatPrice = (price: number | string) => {
    // Ensure the price is a string
    let priceStr = price.toString();

    // Replace any existing dot with a comma
    priceStr = priceStr.replace(".", ",");

    // Add a dot as the thousands separator
    return `${priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;
};

const RenderPriceCell = ({ row }: GridCellParams) => {
    if (!row.budget) return null;

    const formattedPrice = formatPrice(row.budget);
    return <Typography>{formattedPrice}</Typography>;
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
        field: "budget",
        headerName: t("Price").toString(),
        headerAlign: "center",
        align: "center",
        renderCell: RenderPriceCell,
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
