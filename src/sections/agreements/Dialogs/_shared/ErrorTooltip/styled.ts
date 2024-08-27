import { Tooltip, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Z_INDEX } from "@/config";

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
    padding: theme.spacing(0.1),
    borderRadius: "100%",
    backgroundColor: alpha(theme.palette.error.main, 0.1),
    color: theme.palette.error.main,
    "& .MuiAlert-icon": {
        color: theme.palette.error.main,
    },
}));

const StyledTooltip = styled(Tooltip)({
    position: "absolute",
    transform: "translateY(-50%)",
    top: "50%",
    right: 4,
    width: "max-content",
    borderRadius: "100%",
    bgcolor: "background.paper",
    zIndex: Z_INDEX.AGREEMENT_FORM,
});

export { StyledErrorOutlineIcon, StyledTooltip };
