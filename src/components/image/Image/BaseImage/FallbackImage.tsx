import { ImageProps } from "@/components/image/types";
import { forwardRef } from "react";
import NoImageIcon from "@/assets/icons/no-image";
import { SvgIconProps } from "@mui/material";

interface FallbackImageProps extends SvgIconProps {
    validSrc: boolean;
    aspectRatio: ImageProps["aspectRatio"];
}

const FallbackImage = forwardRef<SVGSVGElement, FallbackImageProps>(
    ({ aspectRatio, validSrc, style, ...props }, ref) => {
        const display = validSrc ? "none" : "block";

        return (
            <NoImageIcon
                ref={ref}
                height="100%"
                width="100%"
                style={{
                    padding: "10px",
                    aspectRatio,
                    display,
                    ...style,
                }}
                {...props}
            />
        );
    }
);

FallbackImage.displayName = "FallbackImage";

export default FallbackImage;
