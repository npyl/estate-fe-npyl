import { Box, CircularProgress, Typography } from "@mui/material";
import Image from "./Image";
import { UploadImageProps } from "./types";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useConditionalMemo } from "src/hooks/useConditionalMemo";

interface ProgressLabelProps {
    progress: number;
}

const ProgressLabel = ({ progress }: ProgressLabelProps) => {
    const staticProgress = useConditionalMemo(
        () => progress,
        (p) => p !== -1,
        [progress]
    );

    return (
        <Box
            sx={{
                backgroundColor: "black",
                opacity: 0.7,
                borderRadius: 2,
                padding: 1,
                position: "absolute",
                top: "calc(2%)",
                right: "calc(1%)",
            }}
        >
            <Typography color={"white"}>{staticProgress} %</Typography>
        </Box>
    );
};

// Default image
const defaultImage = "/static/preview/previewImage.png";

const UploadImage = ({
    animate = false,
    progress,
    ref,
    ...props
}: UploadImageProps) => {
    // INFO: ignore the ref, please do not pass it to Image

    const [reached100, setReached100] = useState(false);

    useEffect(() => {
        if (progress === 100) setReached100(true);
    }, [progress]);

    return (
        <div style={{ position: "relative" }}>
            <Image src={defaultImage} {...props} />

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

            {!reached100 && <ProgressLabel progress={progress} />}

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
