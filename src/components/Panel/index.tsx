import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import * as React from "react";

import { useTranslation } from "react-i18next";

export interface PanelProps {
    label: string;
    endNode?: React.ReactNode;
    children?: React.ReactNode;

    childrenSx?: SxProps<Theme>;
}

const Panel = ({ label, endNode, childrenSx, children }: PanelProps) => {
    const { t } = useTranslation();
    return (
        <Paper
            elevation={10}
            sx={{
                padding: 0.5,
            }}
        >
            <Box
                sx={{
                    px: 1.5,
                    py: 1.5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: !!endNode ? "space-between" : "left",
                }}
            >
                <Typography variant="h6">{t(label)}</Typography>
                {endNode}
            </Box>
            <Box px={1.5} pb={1.5} sx={childrenSx}>
                {children}
            </Box>
        </Paper>
    );
};

export default Panel;
