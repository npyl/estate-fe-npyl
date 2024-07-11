import { CircularProgress } from "@mui/material";
import Image from "./Image";
import { IPreviewImageProps } from ".";

const PreviewImage = ({
    animate = false,
    // INFO: ignore the ref, please do not pass it to Image
    ref,
    sx,
    ...props
}: IPreviewImageProps) => (
    <div style={{ position: "relative", display: "inline-block" }}>
        <Image sx={sx} {...props} />
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

export default PreviewImage;
