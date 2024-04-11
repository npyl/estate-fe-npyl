import { StackProps } from "@mui/material";

// ----------------------------------------------------------------------

export type LabelColor =
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";

export type LabelVariant = "filled" | "outlined" | "soft";

export interface LabelProps extends StackProps {
    opaque?: boolean; // makes the label an opaque colored box (just like it used to be)
    disabled?: boolean;
    color: string | LabelColor;
    opacity?: number;
    name: string;
    // variant?: LabelVariant;
    onClose?: () => void;
}
