import { ImageProps } from "./types";
import { forwardRef, useCallback, useRef, SyntheticEvent } from "react";
import NoImageIcon from "@/assets/icons/no-image";
import WrapperWithRatio from "./WrapperWithRatio";

const Image = forwardRef<HTMLImageElement, ImageProps>(
    (
        {
            alt = "",
            src = "",
            size = { width: "100%", height: "100%" },
            imgStyle,
            ...other
        },
        ref
    ) => {
        const fallbackRef = useRef<SVGSVGElement>(null);

        const handleError = useCallback(
            (e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = "none";
                if (!fallbackRef || !fallbackRef.current) return;
                fallbackRef.current.style.display = "block";
            },
            []
        );

        const handleLoad = useCallback(
            (e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = "block";
                e.currentTarget.style.visibility = "visible";
            },
            []
        );

        return (
            <WrapperWithRatio size={size} {...other}>
                <NoImageIcon
                    height="100%"
                    width="100%"
                    style={{ display: "none", padding: "10px" }}
                    ref={fallbackRef}
                />

                <img
                    ref={ref}
                    className="PPImage-img"
                    src={src!}
                    alt={alt}
                    loading="lazy"
                    width={size.width}
                    height={size.height}
                    style={{
                        visibility: "hidden",
                        ...imgStyle,
                    }}
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </WrapperWithRatio>
        );
    }
);

Image.displayName = "Image";

export default Image;
