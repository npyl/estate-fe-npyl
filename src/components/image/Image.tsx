// @mui
import Box from "@mui/material/Box";
import getRatio from "./getRatio";
import { ImageProps } from "./types";

// ----------------------------------------------------------------------

const defaultImage = "/static/img/previewImage.png";

const Image: React.FC<ImageProps> = ({
    ratio,
    alt = "img",
    src = defaultImage,
    size = {
        width: "100%",
        height: "100%",
    },
    sx,
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
            ...sx,
        }}
    >
        <Box
            sx={{
                top: 0,
                left: 0,
                width: 1,
                height: 1,
                position: "absolute",
                backgroundSize: ratio ? "cover !important" : "",
            }}
            // TODO: investigate if this {...other} should go on the container box; currently changing it breaks carousel thumbnail
            {...other}
        >
            <img
                alt={alt}
                src={src!}
                loading="lazy"
                width={size.width}
                height={size.height}
            />
        </Box>
    </Box>
);

export default Image;
