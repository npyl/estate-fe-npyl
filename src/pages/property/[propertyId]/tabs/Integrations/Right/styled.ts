import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
        flexDirection: "row",
    },
    justifyContent: "space-between",
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
