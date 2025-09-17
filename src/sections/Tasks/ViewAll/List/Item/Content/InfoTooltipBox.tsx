import { Box, Tooltip, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface InfoTooltipBoxProps {
    title: string;
    icon: ReactNode;
    value: number | string;
}

const InfoTooltipBox: FC<InfoTooltipBoxProps> = ({ title, icon, value }) => (
    <Tooltip title={title} placement="top">
        <Box display="flex" flexDirection="row" alignItems="center" gap={0.5}>
            <Box
                component="span"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 16,
                    height: 16,
                }}
            >
                {icon}
            </Box>
            <Typography variant="body2">{value}</Typography>
        </Box>
    </Tooltip>
);

export default InfoTooltipBox;
