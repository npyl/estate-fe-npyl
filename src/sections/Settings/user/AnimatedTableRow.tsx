import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "all 0.3s ease-out",
    "&:active": {
        transform: "scale(0.995)",
        transition: "all 0.2s ease-in",
    },
    // Optional: you might want to add hover state
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

export default StyledTableRow;
