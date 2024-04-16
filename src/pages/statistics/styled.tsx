import { styled } from "@mui/system";
import { Rectangle } from "recharts";

const StyledCursor = styled(Rectangle)(({ theme }) => ({
    fill: theme.palette.grey,
}));

export { StyledCursor };
