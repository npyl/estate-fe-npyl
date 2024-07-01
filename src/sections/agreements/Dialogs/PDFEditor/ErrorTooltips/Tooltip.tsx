import { Box, Tooltip, TooltipProps, Typography, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
    padding: theme.spacing(0.1),
    borderRadius: "100%",
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    color: theme.palette.error.main,
    "& .MuiAlert-icon": {
        color: theme.palette.error.main,
    },
}));

interface ErrorTooltipProps extends Omit<TooltipProps, "title" | "children"> {
    error: string;
}

const ErrorTooltip = ({ error, sx, ...props }: ErrorTooltipProps) => (
    <Tooltip
        title={<Typography>{error}</Typography>}
        sx={{
            position: "absolute",
            transform: "translateY(-50%)",
            top: "55%",
            right: 4,
            width: "max-content",
            borderRadius: "100%",
            bgcolor: "background.paper",
            ...sx,
        }}
        {...props}
    >
        <StyledErrorOutlineIcon />
    </Tooltip>
);

export default ErrorTooltip;
