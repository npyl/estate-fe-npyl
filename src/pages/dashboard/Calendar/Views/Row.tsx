import Box from "@mui/material/Box";
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
    >
        <Typography
            variant="caption"
            width={50}
            textAlign="right"
            pr={1}
            color="text.secondary"
        >
            {`${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? "AM" : "PM"}`}
        </Typography>

        <Box flexGrow={1} height="100%" />
    </Stack>
);

export default Row;
