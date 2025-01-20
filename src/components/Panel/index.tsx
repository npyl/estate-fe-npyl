import { Box, Paper, Stack, SxProps, Theme, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface PanelProps extends PropsWithChildren {
    label: string;
    endNode?: React.ReactNode;
    // ...
    paperSx?: SxProps<Theme>;
    headerSx?: SxProps<Theme>;
    childrenSx?: SxProps<Theme>;
}

const Panel: FC<PanelProps> = ({
    label,
    endNode,
    // ...
    paperSx,
    headerSx,
    childrenSx,
    // ...
    children,
}) => (
    <Paper
        elevation={10}
        sx={{
            p: 0.5,
            ...paperSx,
        }}
    >
        <Stack
            p={1.5}
            direction="row"
            justifyContent={!!endNode ? "space-between" : "left"}
            sx={headerSx}
        >
            <Typography variant="h6">{label}</Typography>
            {endNode}
        </Stack>
        <Box px={1.5} pb={1.5} sx={childrenSx}>
            {children}
        </Box>
    </Paper>
);

export type { PanelProps };
export default Panel;
