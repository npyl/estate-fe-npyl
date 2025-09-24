import Paper, { PaperProps } from "@mui/material/Paper";
import { forwardRef } from "react";
import { POPOVER_ELEVATION } from "./constants";

const AutocompletePaper = forwardRef<HTMLDivElement, PaperProps>(
    ({ sx, ...props }, ref) => (
        <Paper
            ref={ref}
            elevation={POPOVER_ELEVATION}
            sx={{ px: 1, border: "1px solid", borderColor: "divider", ...sx }}
            {...props}
        />
    )
);

AutocompletePaper.displayName = "AutocompletePaper";

export default AutocompletePaper;
