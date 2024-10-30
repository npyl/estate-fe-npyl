// @mui
import { Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------

type Props = {
    columnName: string;
};

export default function KanbanColumnToolBar({ columnName }: Props) {
    return (
        <>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
            >
                <Typography
                    fontWeight={600}
                    variant="body2"
                    color="text.secondary"
                >
                    {columnName}
                </Typography>
            </Stack>
        </>
    );
}
