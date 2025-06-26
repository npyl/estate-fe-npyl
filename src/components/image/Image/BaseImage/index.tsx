import { ImageProps } from "@/components/image/types";
import { forwardRef, useCallback, useRef, SyntheticEvent } from "react";
import NoImageIcon from "@/assets/icons/no-image";
import WrapperWithRatio from "./WrapperWithRatio";

const IMAGE_CLASSNAME = "PPImage-img";

// --------------------------------------------------------------------------------

const BaseImage = forwardRef<HTMLImageElement, ImageProps>(
    ({ alt = "", src = "", imgStyle, onLoad, ...props }, ref) => {
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
                onLoad?.(e);

                e.currentTarget.style.display = "block";
                e.currentTarget.style.visibility = "visible";
            },
            [onLoad]
        );

        return (
            <WrapperWithRatio {...props}>
                <NoImageIcon
                    ref={fallbackRef}
                    height="100%"
                    width="100%"
                    style={{ display: "none", padding: "10px", ...imgStyle }}
                />

                <img
                    ref={ref}
                    className={IMAGE_CLASSNAME}
                    src={src!}
                    alt={alt}
                    loading="lazy"
                    width="100%"
                    height="100%"
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

BaseImage.displayName = "Image";

export { IMAGE_CLASSNAME };
export default BaseImage;
