import React from "react";
import { Box, Typography } from "@mui/material";

interface LabelComponentProps {
    text: string;
}

const LabelComponent: React.FC<LabelComponentProps> = ({ text }) => {
    return (
        <Box
            sx={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                paddingLeft: 1,
                paddingRight: 1,
                borderRadius: 15,
                marginBottom: 1,
            }}
        >
            <Typography
                sx={{
                    paddingLeft: "5px",
                    color: "white",
                    textAlign: "right",
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

export default LabelComponent;
