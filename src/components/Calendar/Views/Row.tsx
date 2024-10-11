import Typography from "@mui/material/Typography";
import { FC } from "react";
import { DAY_CELL_HEIGHT } from "./constant";

interface RowProps {
    hour: number;
}

const Row: FC<RowProps> = ({ hour }) => (
    <Typography
        variant="caption"
        width={50}
        textAlign="right"
        pr={1}
        color="text.secondary"
        minHeight={DAY_CELL_HEIGHT}
        bgcolor="background.paper"
        borderBottom="1px solid"
        borderColor="divider"
    >
        {`${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? "AM" : "PM"}`}
    </Typography>
);

export default Row;
