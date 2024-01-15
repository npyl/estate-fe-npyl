import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";

import { useTranslation } from "react-i18next";

interface PanelProps {
    label: string;
    children?: React.ReactNode;
}

const Panel = ({ label, children }: PanelProps) => {
    const { t } = useTranslation();
    return (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0.5,
            }}
        >
            <Box
                sx={{
                    px: 1.5,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{t(label)}</Typography>
            </Box>
            {children}
        </Paper>
    );
};

export default Panel;
