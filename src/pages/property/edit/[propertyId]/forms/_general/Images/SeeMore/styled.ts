import { styled } from "@mui/material/styles";
import { DialogTitle } from "@mui/material";

export const StyledTitle = styled(DialogTitle)({
    position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    minWidth: "95vw",
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
    boxSizing: "border-box",
});
