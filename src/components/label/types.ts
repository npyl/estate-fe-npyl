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
  onClose?: () => void;
  color?: LabelColor;
  variant?: LabelVariant;
}
