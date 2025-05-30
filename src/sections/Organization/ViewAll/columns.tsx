import { GridColDef } from "@mui/x-data-grid";
import { TranslationType } from "@/types/translation";
import Avatar from "@/components/Avatar";
import Stack from "@mui/material/Stack";

const getColumns = (t: TranslationType): GridColDef[] => [
    {
        field: "avatar",
        headerName: "",
        headerAlign: "left",
        align: "left",
        renderCell: (p) => (
            <Stack height={1} alignItems="center" justifyContent="center">
                <Avatar src={p.row?.avatar || ""} />
            </Stack>
        ),
    },

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
