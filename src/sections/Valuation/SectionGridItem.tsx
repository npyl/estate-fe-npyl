import { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { GridProps, SxProps, Theme } from "@mui/material";

const getGridSx = (isMapOpen: boolean): SxProps<Theme> => ({
    width: {
        xs: 1,
        lg: isMapOpen ? "50%" : 1,
    },
});

interface ContentGridItemProps extends GridProps {
    isMapOpen: boolean;
}

const ContentGridItem: FC<ContentGridItemProps> = ({
    isMapOpen,
    sx,
    ...props
}) => <Grid sx={{ ...getGridSx(isMapOpen), ...(sx as any) }} {...props} />;

export default ContentGridItem;
