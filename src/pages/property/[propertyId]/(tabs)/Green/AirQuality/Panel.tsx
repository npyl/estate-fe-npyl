import React from "react";
import { Paper, Typography, Stack, PaperProps, Divider } from "@mui/material";

import { getBorderColor2 } from "@/theme/borderColor";

import { styled } from "@mui/material/styles";

const PanelPaper = styled(Paper)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    width: "100%",
}));

interface PanelProps extends PaperProps {
    title: string;
}

const Panel: React.FC<PanelProps> = ({ title, children, ...props }) => (
    <PanelPaper {...props} elevation={2}>
        <Typography textAlign="center" py={2} variant="h6">
            {title}
        </Typography>
        <Divider />
        <Stack p={2} spacing={1}>
            {children}
        </Stack>
    </PanelPaper>
);

export default Panel;
