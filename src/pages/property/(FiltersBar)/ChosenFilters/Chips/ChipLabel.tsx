import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface ChipLabelProps {
    title: string;
    value: string;
}

const ChipLabel: FC<ChipLabelProps> = ({ title, value }) => (
    <Stack direction="row" spacing={1}>
        <Typography fontWeight="medium">{title}:</Typography>
        <Typography textTransform="capitalize">{value}</Typography>
    </Stack>
);

export default ChipLabel;
