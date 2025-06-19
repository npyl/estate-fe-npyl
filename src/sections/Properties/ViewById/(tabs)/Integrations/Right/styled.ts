import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    gap: theme.spacing(1),

    [theme.breakpoints.up("md")]: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    spacing: theme.spacing(1),

    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[800],

    color:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[500]
            : theme.palette.neutral?.[400],

    padding: theme.spacing(1),

    borderRadius: "15px",
}));

export default Item;
