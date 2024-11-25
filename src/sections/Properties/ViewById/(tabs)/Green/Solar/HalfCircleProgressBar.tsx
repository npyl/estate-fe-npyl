import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const CircleCutter = styled(Box)(({ theme }) => ({
    position: "absolute",
    zIndex: 2,
    textAlign: "center",
    width: 0,
    height: 0,
    borderBottom: "90px solid",
    borderBottomColor:
        theme.palette.mode === "light" ? "white" : theme.palette.neutral?.[900],
    borderLeft: "40px solid transparent",
    borderRight: "40px solid transparent",
    bottom: "0",
    left: 0,
    right: 0,
    margin: "auto",
}));

interface HalfCircleProgressBarProps {
    value: number;
    color?:
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning"
        | "inherit"
        | undefined;
    label?: string;
}

const HalfCircleProgressBar: React.FC<HalfCircleProgressBarProps> = ({
    value,
    color,
    label,
}) => {
    return (
        <Box width="max-content" position="relative" alignItems="center">
            <CircularProgress
                variant="determinate"
                value={value}
                color={color}
                size={100}
                thickness={4}
                sx={{
                    position: "absolute",
                    left: 0,
                    zIndex: 1,
                    borderRadius: "50%",
                    "& > svg": {
                        transform: "rotate(-135deg)",
                    },
                }}
            />
            <CircularProgress
                variant="determinate"
                value={100}
                style={{ color: "#d0d0d0" }}
                color="inherit"
                size={100}
                thickness={4}
                sx={{ borderRadius: "50%" }}
            />

            <CircleCutter />

            {label ? (
                <Typography
                    variant="body2"
                    sx={{
                        position: "absolute",
                        zIndex: 2,
                        textAlign: "center",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textWrap: "wrap",
                    }}
                >
                    {label}
                </Typography>
            ) : null}
        </Box>
    );
};

export default HalfCircleProgressBar;
