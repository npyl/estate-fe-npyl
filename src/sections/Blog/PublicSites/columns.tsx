import PublicLogo from "@/assets/logo/Public";
import { IPublicSitesRes } from "@/types/company";
import { TranslationType } from "@/types/translation";
import { GridColDef } from "@mui/x-data-grid";

const getColumns = (t: TranslationType): GridColDef<IPublicSitesRes>[] => [
    {
        field: "image",
        headerName: "",
        headerAlign: "left",
        align: "left",
        renderCell: () => <PublicLogo />,
    },
    {
        flex: 1.2,
        field: "siteUrl",
        headerName: t<string>("Site"),
        headerAlign: "left",
        align: "left",
        renderCell: (p) => p.row.siteUrl,
    },
];

export default getColumns;
