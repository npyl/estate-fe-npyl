// @mui
import { Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
    name: string;
    count: number;
};

export default function Header({ name, count }: Props) {
    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6">
                {name} ({count})
            </Typography>
        </Stack>
    );
}
