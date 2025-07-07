import { CircularProgress } from "@mui/material";
import Image from "@/components/image";
import { IPreviewImageProps } from ".";
import { forwardRef } from "react";

const PreviewImage = forwardRef<HTMLImageElement, IPreviewImageProps>(
    ({ animate = false, ...props }, ref) => (
        <div style={{ position: "relative" }}>
            <Image ref={ref} {...props} />
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
    )
);

export default PreviewImage;
