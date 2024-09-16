import { GridCellParams, GridColDef } from "@mui/x-data-grid";
import { TranslationType } from "@/types/translation";
import { TypeLabels } from "@/components/TypeLabels";
import RenderLabelsCell from "../shared/RenderLabels";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

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
    return (
        <Typography style={{ fontSize: "inherit", fontFamily: "inherit" }}>
            {formattedPrice}
        </Typography>
    );
};

const RenderAreaCell = ({ row }: GridCellParams) => {
    const { i18n } = useTranslation();

    if (!row.areas) return null;

    const areas = row.areas
        .map(({ nameEN, nameGR }: any) =>
            i18n.language === "en" ? nameEN : nameGR
        )
        .join(", ");

    return (
        <Typography style={{ fontSize: "inherit", fontFamily: "inherit" }}>
            {areas}
        </Typography>
    );
};

const renderDateCell = ({ row }: GridCellParams) => {
    const timestamp = row.createdAt;
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return (
        <Typography
            style={{ fontSize: "inherit", fontFamily: "inherit" }}
        >{`${day}/${month}/${year}`}</Typography>
    );
};

const getColumns = (t: TranslationType): GridColDef[] => [
    {
        flex: 1,
        field: "firstName",
        headerName: t("First Name").toString(),
        headerAlign: "center",
        sortable: false,
        align: "center",
    },
    {
        flex: 1,
        field: "lastName",
        headerName: t("Last Name").toString(),
        headerAlign: "center",
        sortable: false,
        align: "center",
    },
    {
        flex: 1,
        field: "mobilePhone",
        headerName: t("Mobile Phone").toString(),
        headerAlign: "center",
        sortable: false,
        align: "center",
    },

    {
        flex: 1,
        field: "budget",
        headerName: t("Price").toString(),
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: RenderPriceCell,
    },

    {
        flex: 1,
        field: "areas",
        headerName: t("Region").toString(),
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: RenderAreaCell,
    },

    {
        flex: 1,
        field: "createdAt",
        headerName: t("Date of Entry").toString(),
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: renderDateCell,
    },
    {
        flex: 1,
        field: "category",
        headerAlign: "center",
        align: "center",
        headerName: t("_SubCategory").toString(),
        sortable: false,
        renderCell: StatusColor,
    },
    {
        width: 255,
        field: "labels",
        headerAlign: "center",
        align: "center",
        headerName: t("Labels").toString(),
        sortable: false,
        renderCell: RenderLabelsCell,
    },
];

export default getColumns;
