// @mui
import Box from "@mui/material/Box";
import getRatio from "./getRatio";
import { ImageProps } from "./types";
import { forwardRef, useCallback } from "react";

// ----------------------------------------------------------------------

const defaultImage = "/static/preview/previewImage.png";

const Image = forwardRef<HTMLImageElement, ImageProps>(
    (
        {
            ratio,
            alt = "",
            src = defaultImage,
            size = {
                width: "100%",
                height: "100%",
            },
            containerSx,
            sx,
            imgStyle,
            ...other
        },
        ref
    ) => {
        // Set defaultImage
        const handleError = useCallback(() => {
            if (!ref || typeof ref !== "object" || !ref.current) return;
            ref.current.src = defaultImage;
        }, []);

        return (
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
                    // TODO: investigate if this {...other} should go on the container box; currently changing it breaks carousel thumbnail
                    {...other}
                >
                    <img
                        ref={ref}
                        className="PPImage-img"
                        alt={alt}
                        src={src!}
                        loading="lazy"
                        width={size.width}
                        height={size.height}
                        style={{
                            ...imgStyle,
                        }}
                        onError={handleError}
                    />
                </Box>
            </Box>
        );
    }
);

Image.displayName = "Image";

export default Image;
