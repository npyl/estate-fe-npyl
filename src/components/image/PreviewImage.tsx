import { CircularProgress } from "@mui/material";
import Image from "./Image";
import { IPreviewImageProps, ImageProps } from ".";

const PreviewImage = ({
    animate = false,
    ref,
    sx,
    ...props
}: IPreviewImageProps) => {
    // Default image
    const defaultImage = "/static/img/previewImage.png";

    // INFO: ignore the ref, please do not pass it to Image

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Image src={defaultImage} sx={sx} {...props} />
            {animate && (
                <CircularProgress
                    sx={{
                        position: "absolute",
                        top: "calc(50% - 20px)",
                        left: "calc(50% - 20px)",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    );
};

export default PreviewImage;
