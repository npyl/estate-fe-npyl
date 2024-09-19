import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

type ColorType =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";

interface SoftButtonProps extends Omit<ButtonProps, "color"> {
    color?: ColorType;
}

const SoftButton = styled(Button)<SoftButtonProps>(
    ({ theme, color = "primary" }) => ({
        color: theme.palette[color].main,
        backgroundColor: alpha(theme.palette[color].main, 0.16),
        "&:hover": {
            backgroundColor: alpha(theme.palette[color].main, 0.32),
        },
    })
);

export default SoftButton;
