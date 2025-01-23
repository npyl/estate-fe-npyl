import Typography, { TypographyProps } from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";

type ColorType =
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";

interface SoftTypographyProps extends Omit<TypographyProps, "color"> {
    color?: ColorType;
}

const SoftTypography = styled(Typography)<SoftTypographyProps>(
    ({ theme, color = "primary" }) => ({
        color: theme.palette[color].main,
        backgroundColor: alpha(theme.palette[color].main, 0.16),
    })
);

export type { ColorType };
export default SoftTypography;
