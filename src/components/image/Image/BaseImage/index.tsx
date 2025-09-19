import { ImageProps } from "@/components/image/types";
import { forwardRef, useCallback, useRef, SyntheticEvent } from "react";
import StyledImg from "./StyledImg";
import FallbackImage from "./FallbackImage";

const BaseImage = forwardRef<HTMLImageElement, ImageProps>(
    ({ alt = "", src = "", style, aspectRatio, onLoad, ...props }, ref) => {
        const fallbackRef = useRef<SVGSVGElement>(null);
        const isSrcValid = Boolean(src);

        const handleError = useCallback(
            (e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.style.display = "none";
                if (!fallbackRef.current) return;
                fallbackRef.current.style.display = "block";
            },
            []
        );

        const handleLoad = useCallback(
            (e: SyntheticEvent<HTMLImageElement>) => {
                onLoad?.(e);

                e.currentTarget.style.display = "block";
                e.currentTarget.style.visibility = "visible";
            },
            [onLoad]
        );

        return (
            <>
                <FallbackImage
                    ref={fallbackRef}
                    aspectRatio={aspectRatio}
                    validSrc={isSrcValid}
                    style={{ width: style?.width, height: style?.height }}
                />

                {src ? (
                    <StyledImg
                        ref={ref}
                        src={src}
                        alt={alt}
                        loading="lazy"
                        width="100%"
                        height="100%"
                        style={{
                            visibility: "hidden",
                            aspectRatio,
                            ...style,
                        }}
                        onLoad={handleLoad}
                        onError={handleError}
                        {...props}
                    />
                ) : null}
            </>
        );
    }
);

BaseImage.displayName = "Image";

export type { ImageProps };
export default BaseImage;
