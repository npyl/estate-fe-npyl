import Box, { BoxProps } from "@mui/material/Box";
import * as React from "react";

interface TabPanelProps extends BoxProps {
    index: number;
    value: number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return value === index ? (
        <Box
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            height={"100%"}
            {...other}
        >
            {children}
        </Box>
    ) : null;
}
