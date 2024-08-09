import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Lock } from "@mui/icons-material";

const Label = styled(Typography)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    background: "rgba(0, 0, 0, 0.5)",
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(5),
}));

const LockIcon = styled(Lock)(({ theme }) => ({
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    background: "rgba(0, 0, 0, 0.7)",
    color: theme.palette.common.white,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(5),
}));

export { Label, LockIcon };
