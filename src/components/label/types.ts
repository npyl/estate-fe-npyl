import { BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

export type LabelColor =
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";

export type LabelVariant = "filled" | "outlined" | "soft";

export interface LabelProps extends BoxProps {
    opaque?: boolean; // makes the label an opaque colored box (just like it used to be)
    disabled?: boolean;
    onClose?: () => void;
    color?: LabelColor;
    variant?: LabelVariant;
}
