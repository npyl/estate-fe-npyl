import { styled } from "@mui/material/styles";
import { DialogTitle } from "@mui/material";

export const StyledTitle = styled(DialogTitle)(({ theme }) => ({
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // ....
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
    boxSizing: "border-box",
    padding: theme.spacing(1),
    // ...
    top: 0,
    zIndex: 2,
    minWidth: "95vw",
}));
