import React from "react";
import {
    Typography,
    Stack,
    PaperProps,
    Divider,
    StackProps,
} from "@mui/material";
import { PanelPaper } from "./styled";

export interface PanelProps extends PaperProps {
    title: string;
    contentProps?: StackProps;
}

const Panel: React.FC<PanelProps> = ({
    title,
    children,
    contentProps,
    ...props
}) => (
    <PanelPaper {...props} elevation={2}>
        <Typography textAlign="center" py={2} variant="h6">
            {title}
        </Typography>
        <Divider />
        <Stack p={2} spacing={1} {...contentProps}>
            {children}
        </Stack>
    </PanelPaper>
);

export default Panel;
