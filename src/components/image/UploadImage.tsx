import { CircularProgress, Typography } from "@mui/material";
import Image from "./Image";
import { UploadImageProps } from "./types";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const UploadImage = ({
    animate = false,
    progress,
    ref,
    sx,
    ...props
}: UploadImageProps) => {
    // Default image
    const defaultImage = "/static/img/previewImage.png";

    // INFO: ignore the ref, please do not pass it to Image

    const [reached100, setReached100] = useState(false);

    useEffect(() => {
        if (progress === 100) setReached100(true);
    }, [progress]);

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <Image src={defaultImage} sx={sx} {...props} />

            {animate && !reached100 && (
                <CircularProgress
                    sx={{
                        position: "absolute",
                        top: "calc(50% - 20px)",
                        left: "calc(50% - 20px)",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}

            {progress > 0 && !reached100 && (
                <Typography
                    sx={{
                        position: "absolute",
                        top: "calc(50% - 20px)",
                        left: "calc(50% - 20px)",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {progress}
                </Typography>
            )}

            {reached100 && (
                <CheckCircleIcon
                    sx={{
                        color: "green",
                        position: "absolute",
                        top: "calc(10%)",
                        right: -1,
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
        </div>
    );
};

export default UploadImage;
