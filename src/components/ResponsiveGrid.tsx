import { FC, PropsWithChildren } from "react";
import Grid, { Grid2Props } from "@mui/material/Unstable_Grid2";
import { Drawer, DrawerProps, SxProps, Theme } from "@mui/material";

const GridSx: SxProps<Theme> = {
    display: {
        xs: "none",
        lg: "block",
    },
};
const DrawerSx: SxProps<Theme> = {
    display: {
        xs: "block",
        lg: "none",
    },
};

type TGridProps = Omit<Grid2Props, "children">;
type TDrawerProps = Omit<DrawerProps, "children">;

interface ResponsiveGridProps extends PropsWithChildren {
    gridProps?: TGridProps;
    drawerProps?: TDrawerProps;
}

const ResponsiveGrid: FC<ResponsiveGridProps> = ({
    gridProps: _gridProps,
    drawerProps: _drawerProps,
    // ...
    children,
}) => {
    const { sx: gridSx, ...gridProps } = _gridProps || {};
    const { sx: drawerSx, ...drawerProps } = _drawerProps || {};

    return (
        <>
            <Grid sx={{ ...GridSx, ...gridSx }} {...gridProps}>
                {children}
            </Grid>
            <Drawer open sx={{ ...DrawerSx, ...drawerSx }} {...drawerProps}>
                {children}
            </Drawer>
        </>
    );
};

export type { TGridProps, TDrawerProps };
export default ResponsiveGrid;
