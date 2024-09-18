import { styled } from "@mui/material/styles";
import { Rectangle } from "recharts";

const StyledCursor = styled(Rectangle)(({ theme }) => ({
    fill: theme.palette.grey[200],
}));

export { StyledCursor };
