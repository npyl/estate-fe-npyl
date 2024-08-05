import { TooltipProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import { StyledErrorOutlineIcon, StyledTooltip } from "./styled";

export interface ErrorTooltipProps
    extends Omit<TooltipProps, "title" | "children"> {
    error: string;
}

const ErrorTooltip = ({ error, ...props }: ErrorTooltipProps) => (
    <StyledTooltip title={<Typography>{error}</Typography>} {...props}>
        <StyledErrorOutlineIcon />
    </StyledTooltip>
);

export default ErrorTooltip;
