import { styled } from "@mui/material/styles";
import { Rectangle } from "recharts";

const StyledCursor = styled(Rectangle)(({ theme }) => ({
    fill:
        theme.palette.mode === "light"
            ? theme.palette.grey[300]
            : theme.palette.grey[700],
}));

export { StyledCursor };
