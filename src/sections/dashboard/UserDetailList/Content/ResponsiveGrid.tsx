import { Grid, GridProps } from "@mui/material";
import { FC } from "react";

const HideBelowMd: GridProps = {
    // Hide on small screens by default
    display: { xs: "none", md: "block" },
    // Show on all screens when inside popover
    sx: {
        ".MuiPopover-root &": {
            display: "block !important",
        },
    },
};

const ResponsiveGrid: FC<GridProps> = (props) => (
    <Grid {...HideBelowMd} {...props} />
);

export default ResponsiveGrid;
