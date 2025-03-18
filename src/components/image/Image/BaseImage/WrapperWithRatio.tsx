import Box from "@mui/material/Box";
import getRatio from "./getRatio";
import { WrapperWithRatioProps } from "../../types";
import { FC } from "react";
import { Theme } from "@mui/material";

// -------------------------------------------------------------------

const getImageBackground = ({ palette: { mode } }: Theme) =>
    mode === "light" ? "grey.100" : "neutral.800";

// -------------------------------------------------------------------

const WrapperWithRatio: FC<WrapperWithRatioProps> = ({
    ratio,
    containerSx,
    sx,
    children,
    ...other
}) => (
    <Box
        component="span"
        sx={{
            borderRadius: 1,
            width: 1,
            lineHeight: 1,
            display: "block",
            overflow: "hidden",
            position: "relative",
            pt: getRatio(ratio),

            ".PPImage-img": {
                bgcolor: getImageBackground,
            },

            ...containerSx,
        }}
    >
        <Box
            sx={{
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                position: "absolute",
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    </Box>
);

export default WrapperWithRatio;
