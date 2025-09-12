import { SxProps, Theme } from "@mui/material";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";

const HeadSx: SxProps<Theme> = {
    ".MuiSvgIcon-root": {
        width: "22px",
        height: "22px",
    },
};

const Head: FC<TypographyProps> = ({ sx, ...props }) => (
    <Typography
        variant="h6"
        display="flex"
        justifyContent="center"
        gap={1}
        alignItems="center"
        width="100%"
        p={1}
        // ...
        position="sticky"
        top={0}
        bottom={0}
        bgcolor="background.default"
        color="text.secondary"
        zIndex={1}
        boxShadow={1}
        // ...
        sx={{ ...HeadSx, ...(sx as any) }}
        // ...
        {...props}
    />
);

export default Head;
