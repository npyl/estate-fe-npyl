import { GridColDef } from "@mui/x-data-grid";
import { TranslationType } from "@/types/translation";

const getColumns = (t: TranslationType): GridColDef[] => [
    {
        flex: 1.2,
        field: "name",
        headerName: t<string>("Name"),
        headerAlign: "left",
        align: "left",
    },

    // {
    //     flex: 1,
    //     field: "email",
    //     headerName: "Email",
    //     headerAlign: "left",
    //     align: "left",
    // },

    // {
    //     flex: 1,
    //     field: "phone",
    //     headerName: t<string>("Phone"),
    //     headerAlign: "left",
    //     align: "left",
    // },

    // {
    //     flex: 1,
    //     field: "gemh",
    //     headerName: "GEMH",
    //     headerAlign: "left",
    //     align: "left",
    // },
];

export default getColumns;
