import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import { alpha, styled } from "@mui/material/styles";

type ColorType =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";

interface SoftButtonProps extends Omit<LoadingButtonProps, "color"> {
    color?: ColorType;
}

const SoftButton = styled(LoadingButton)<SoftButtonProps>(
    ({ theme, color = "primary" }) => ({
        color: theme.palette[color].main,
        backgroundColor: alpha(theme.palette[color].main, 0.16),
        "&:hover": {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
        },
    })
);

export default SoftButton;
