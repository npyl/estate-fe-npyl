import Grid, { Grid2Props as GridProps } from "@mui/material/Unstable_Grid2";
import { FC } from "react";

const HideBelowMd: GridProps = {
    // Hide on small screens by default
    display: { xs: "none", md: "block" },
    // Show on all screens when inside popover
    sx: {
        ".MuiPopover-root &": {
            display: "block",
        },
    },
};

interface ResponsiveGridProps extends GridProps {}

const ResponsiveGrid: FC<ResponsiveGridProps> = (props) => (
    <Grid {...HideBelowMd} {...props} />
);

export type { ResponsiveGridProps };
export default ResponsiveGrid;
