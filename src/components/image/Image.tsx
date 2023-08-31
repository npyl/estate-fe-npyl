import { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
// @mui
import { Box } from "@mui/material";
//
import getRatio from "./getRatio";
import { ImageProps } from "./types";

// ----------------------------------------------------------------------

const Image = forwardRef<HTMLSpanElement, ImageProps>(
    (
        {
            ratio,
            disabledEffect = false,
            effect = "blur",
            size = {
                width: "100%",
                height: "100%",
            },
            sx,
            ...other
        },
        ref
    ) => {
        const content = (
            <Box
                component={LazyLoadImage}
                wrapperClassName="wrapper"
                effect={disabledEffect ? undefined : effect}
                placeholderSrc={
                    disabledEffect
                        ? "/static/transparent.png"
                        : "/static/placeholder.svg"
                }
                width={size.width}
                height={size.height}
                {...other}
            />
        );

        if (ratio) {
            return (
                <Box
                    ref={ref}
                    component="span"
                    sx={{
                        borderRadius: 1,
                        width: 1,
                        lineHeight: 1,
                        display: "block",
                        overflow: "hidden",
                        position: "relative",
                        pt: getRatio(ratio),
                        "& .wrapper": {
                            top: 0,
                            left: 0,
                            width: 1,
                            height: 1,
                            position: "absolute",
                            backgroundSize: "cover !important",
                        },
                        ...sx,
                    }}
                >
                    {content}
                </Box>
            );
        }

        return (
            <Box
                ref={ref}
                component="span"
                sx={{
                    lineHeight: 1,
                    display: "block",
                    overflow: "hidden",
                    position: "relative",
                    "& .wrapper": {
                        width: 1,
                        height: 1,
                        backgroundSize: "cover !important",
                    },
                    ...sx,
                }}
            >
                {content}
            </Box>
        );
    }
);

export default Image;
