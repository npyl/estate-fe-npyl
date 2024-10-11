import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { DAY_CELL_HEIGHT } from "./constant";

interface RowProps {
    hour: number;
}

const Row: FC<RowProps> = ({ hour }) => (
    <Stack
        borderBottom="1px solid"
        borderColor="divider"
        minHeight={DAY_CELL_HEIGHT}
        direction="row"
        alignItems="center"
        bgcolor="neutral.100"
    >
        <Typography
            variant="caption"
            width={50}
            textAlign="right"
            pr={1}
            color="text.secondary"
            height={DAY_CELL_HEIGHT}
            bgcolor="background.paper"
        >
            {`${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? "AM" : "PM"}`}
        </Typography>
    </Stack>
);

export default Row;
